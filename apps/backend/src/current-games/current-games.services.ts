import { Injectable } from "@nestjs/common";
import { BehaviorSubject, Observable } from "rxjs";
import { fetchCurrentGames } from "./current-games.api";
import { PlayerRepository } from "src/player/player.repository";
import { LeaderboardService } from "../leaderboard/leaderboard.service";
import { CurrentGame } from "@aoe4.fr/shared-types";
import { toCurrentGameDto } from "./current-games.mapper";
import { WololoPlayerRepository } from "../wololo-player/wololo-player.repository";


@Injectable()
export class CurrentGamesService {
    constructor(
        private readonly playerRepository: PlayerRepository,
        private readonly leaderboardService: LeaderboardService,
        private readonly wololoPlayerRepository: WololoPlayerRepository,
    ) {}

    private readonly gamesSubject = new BehaviorSubject<CurrentGame[]>([]);

    public get games$(): Observable<CurrentGame[]> {
        return this.gamesSubject.asObservable();
    }

    public async getCurrentGames(): Promise<CurrentGame[]> {
        if (this.gamesSubject.value.length === 0) {
            await this.setCurrentGamesFromActivePlayers();
        }
        return this.gamesSubject.value;
    }

    private async buildRankMap(): Promise<Map<number, string | null>> {
        const map = new Map<number, string | null>();
        for (const p of await this.leaderboardService.getLeaderboard()) {
            map.set(p.id, p.rm_solo_rank_level);
        }
        for (const p of await this.leaderboardService.getLeaderboardTeam()) {
            if (!map.has(p.id)) {
                map.set(p.id, p.rm_solo_rank_level);
            }
        }
        return map;
    }

    public async setCurrentGamesFromActivePlayers(): Promise<void> {
        const [activeProfileIds, wololoPlayers] = await Promise.all([
            this.playerRepository.findAllProfileIdsFromActivePlayers(),
            this.wololoPlayerRepository.findAll(),
        ]);
        const wololoProfileIds = wololoPlayers.map((p) => p.profileId);
        const profileIds = [...new Set([...activeProfileIds, ...wololoProfileIds])];
        const rankMap = await this.buildRankMap();

        const games = (await fetchCurrentGames(profileIds))
            .map(({ game, profileId }) => toCurrentGameDto(game, profileId, rankMap));
        this.gamesSubject.next(games);
    }

}