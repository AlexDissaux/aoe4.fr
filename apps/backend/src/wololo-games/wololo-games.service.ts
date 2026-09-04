import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WololoGamesApi } from "./wololo-games.api";
import { WololoPlayerEntity } from "src/wololo-player/entities/wololo-player.entity";
import { WololoGameEntity } from "./wololo-games.entity";
import { sinceDate } from "src/wololo-player/entities/wololo-player.data";
import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { WololoPlayerService } from "src/wololo-player/wololo-player.service";

// aoe4world can briefly report a finished game with a null result while it finishes processing.
// Such games are skipped (see isGameFullyProcessed) and expected to be retried on the next sync.
// But if a later game finishes processing first, it becomes the per-player cursor, so without a
// lookback buffer the still-pending older game would be skipped forever. Re-fetching a game we
// already saved is harmless: (gameId, profileId) is a composite PK, so it's just an upsert.
const GAME_SYNC_LOOKBACK_MS = 5 * 60 * 60 * 1000; // 5h safety window

@Injectable()
export class WololoGamesService implements OnApplicationBootstrap {
    private readonly logger = new Logger(WololoGamesService.name);

    @InjectRepository(WololoPlayerEntity)
    private readonly wololoPlayerRepository: Repository<WololoPlayerEntity>;

    @InjectRepository(WololoGameEntity)
    private readonly wololoGameRepository: Repository<WololoGameEntity>;

    @Inject(WololoGamesApi)
    private readonly wololoGamesApi: WololoGamesApi;

    @Inject(WololoPlayerService)
    private readonly wololoPlayerService: WololoPlayerService;


    onApplicationBootstrap() {
        this.synchronizeGames();
    }

    @Cron('0 */3 * * * *') // Runs every 3 minutes
    handleSynchronizeGames() {
        this.synchronizeGames();
    }

    async synchronizeGames() {
        const playerProfileIds: WololoPlayerEntity[] = await this.wololoPlayerRepository.find({select: ["profileId"]});

        for (const player of playerProfileIds) {

            // Get the last game register
            let lastGame = (await this.wololoGameRepository.findOne({
                where: {profileId: player.profileId },
                order: {startedAt: "DESC"}
            }));

            const lastGameDate: string = lastGame
                ? new Date(Math.max(
                    new Date(sinceDate).getTime(),
                    lastGame.startedAt.getTime() - GAME_SYNC_LOOKBACK_MS,
                )).toISOString()
                : sinceDate;

            const wololoPlayerGames = await this.wololoGamesApi.fetchPlayerGames(player.profileId, lastGameDate);

            const wololoPlayerGamesFiltered = wololoPlayerGames
                .filter(game => this.filterTeamGames(game, playerProfileIds))
                // The lookback buffer can pull in games older than the tournament start; never register those
                .filter(game => new Date(game.started_at).getTime() >= new Date(sinceDate).getTime());

            for (const game of wololoPlayerGamesFiltered) {
                const gameEntity = this.wololoGameRepository.create({
                    gameId: game.game_id,
                    profileId: player.profileId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    startedAt: new Date(game.started_at),
                    map: game.map,
                    leaderboard: game.leaderboard,
                    ongoing: game.ongoing,
                    teams: game.teams,
                });
                await this.wololoGameRepository.save(gameEntity);
            }
        }

        // Synchronize wololo players after synchronizing games
        try {
            await this.wololoPlayerService.syncWololoPlayers();
        } catch (error) {
            this.logger.error('Scheduled wololo players sync failed:', error);
        }

    }

    private filterTeamGames(game: any, playerProfileIds: WololoPlayerEntity[]): boolean {
        // Check if the team of the player are all player included in playerProfileIds
        const playerProfileIdSet = new Set(playerProfileIds.map(p => p.profileId));
        return game.teams.some(team => team.every(player => playerProfileIdSet.has(player.player.profile_id)));
    }

    // Rows are duplicated per tracked player in a game, so count distinct game ids.
    async getTotalGamesCount(): Promise<number> {
        const { count } = await this.wololoGameRepository
            .createQueryBuilder('game')
            .select('COUNT(DISTINCT game.gameId)', 'count')
            .getRawOne<{ count: string }>();
        return Number(count);
    }
}