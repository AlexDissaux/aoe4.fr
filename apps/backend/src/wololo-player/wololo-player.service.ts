import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { ITwitchStream, ITwitchVod } from "@aoe4.fr/shared-types";
import { WololoPlayerApi } from "./wololo-player.api";
import { WololoPlayerRepository } from "./wololo-player.repository";
import { TwitchApiService } from "../twitch/twitch-api.service";
import { toWololoPlayer } from "./wololo-player.mapper";
import { delay } from "src/common/utils/delay.service";

function getPlayerResult(game: any, profileId: number): string {
    for (const team of game.teams ?? []) {
        for (const entry of team) {
            if (entry.player?.profile_id === profileId) {
                return entry.player.result ?? '';
            }
        }
    }
    return '';
}

function getWonCivs(games: any[], profileId: number): string[] {
    const civs = new Set<string>();
    for (const game of games) {
        for (const team of game.teams ?? []) {
            for (const entry of team) {
                if (entry.player?.profile_id === profileId && entry.player.result === 'win') {
                    const civ = entry.player.civilization;
                    if (civ) civs.add(civ);
                }
            }
        }
    }
    return Array.from(civs).sort();
}

@Injectable()
export class WololoPlayerService implements OnApplicationBootstrap {
    @Inject(WololoPlayerRepository)
    private readonly wololoPlayerRepository: WololoPlayerRepository;

    private readonly logger = new Logger(WololoPlayerService.name);
    private wololoPlayers: WololoPlayer[] = [];

    constructor(
        private readonly wololoPlayerApi: WololoPlayerApi,
        private readonly twitchApiService: TwitchApiService,
    ) {}

    async onApplicationBootstrap() {
        this.wololoPlayers = await this.wololoPlayerRepository.findAll();
        this.logger.log(`Loaded ${this.wololoPlayers.length} wololo players from DB`);
        this.syncWololoPlayers();
    }

    async getWololoPlayers(): Promise<WololoPlayer[]> {
        if (this.wololoPlayers.length === 0) {
            this.wololoPlayers = await this.wololoPlayerRepository.findAll();
        }
        return this.wololoPlayers;
    }

    async syncWololoPlayers(): Promise<void> {
        this.logger.log('Syncing wololo players...');
        // For all wololo players
        for (const wololoPlayer of this.wololoPlayers) {
            // Delay
            await delay(300);            
            // update Info
            const wololoPlayerInfo = await this.wololoPlayerApi.fetchPlayerInfo(wololoPlayer.profileId);
            const twitchUrl: string | null = wololoPlayerInfo.social?.twitch ?? null;
            const twitchLogin = twitchUrl
                ? twitchUrl.replace(/.*twitch\.tv\//, '').replace(/\/.*$/, '').toLowerCase() || null
                : null;
            wololoPlayer.twitchLogin = twitchLogin;
            wololoPlayer.name = wololoPlayerInfo.name ?? wololoPlayer.name;

            // upadate scores
            const wololoPlayerGames = await this.wololoPlayerApi.fetchPlayerGames(wololoPlayer.profileId);
            // TODO: delete first game if it's ongoing true
            wololoPlayer.gamesCount = wololoPlayerGames.length;
            const gamesWon = wololoPlayerGames.filter(g => getPlayerResult(g, wololoPlayer.profileId) === 'win');
            wololoPlayer.wins = gamesWon.length;
            wololoPlayer.civsWon = getWonCivs(wololoPlayerGames, wololoPlayer.profileId);
            // wololoPlayer.civsWon = Array.from(new Set(gamesWon.map(g => g.civ)));
            wololoPlayer.mapsWon = Array.from(new Set(gamesWon.map(g => g.map)));
        }
        // this.wololoPlayers = rawPlayers.map(toWololoPlayer);
        await this.wololoPlayerRepository.upsertAll(this.wololoPlayers);
        this.logger.log(`Synced ${this.wololoPlayers.length} wololo players`);
    }



    private getTwitchLogins(): string[] {
        return this.wololoPlayers
            .map(p => p.twitchLogin)
            .filter((l): l is string => l !== null && l.length > 0);
    }

    async getWololoStreams(): Promise<ITwitchStream[]> {
        const logins = this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchStreamsByLogins(logins);
    }

    async getWololoVods(): Promise<ITwitchVod[]> {
        const logins = this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchVodsByLogins(logins);
    }
}
