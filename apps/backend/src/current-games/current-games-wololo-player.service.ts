import { Injectable } from "@nestjs/common";
import { BehaviorSubject, Observable } from "rxjs";
import { fetchCurrentGames } from "./current-games.api";
import { CurrentGame } from "@aoe4.fr/shared-types";
import { toCurrentGameDto } from "./current-games.mapper";
import { WololoPlayerRepository } from "../wololo-player/wololo-player.repository";


@Injectable()
export class CurrentGamesWololoPlayerService {
    constructor(
        private readonly wololoPlayerRepository: WololoPlayerRepository,
    ) {}

    private readonly gamesSubject = new BehaviorSubject<CurrentGame[]>([]);

    public get games$(): Observable<CurrentGame[]> {
        return this.gamesSubject.asObservable();
    }

    public async getCurrentGames(): Promise<CurrentGame[]> {
        if (this.gamesSubject.value.length === 0) {
            await this.setCurrentGamesFromWololoPlayers();
        }
        return this.gamesSubject.value;
    }

    public async setCurrentGamesFromWololoPlayers(): Promise<void> {
        const wololoPlayers = await this.wololoPlayerRepository.findAll();
        const profileIds = wololoPlayers.map((p) => p.profileId);

        const games = (await fetchCurrentGames(profileIds))
            .map(({ game, profileId }) => toCurrentGameDto(game, profileId));
        this.gamesSubject.next(games);
    }
}
