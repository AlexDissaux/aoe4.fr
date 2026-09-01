import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WololoGamesApi } from "./wololo-games.api";
import { WololoPlayerEntity } from "src/wololo-player/entities/wololo-player.entity";
import { WololoGameEntity } from "./wololo-games.entity";
import { sinceDate } from "src/wololo-player/entities/wololo-player.data";


import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class WololoGamesService {

    @InjectRepository(WololoPlayerEntity)
    private readonly wololoPlayerRepository: Repository<WololoPlayerEntity>;

    @InjectRepository(WololoGameEntity)
    private readonly wololoGameRepository: Repository<WololoGameEntity>;

    @Inject(WololoGamesApi)
    private readonly wololoGamesApi: WololoGamesApi;


    async synchronizeGames() {
        const playerProfileIds: WololoPlayerEntity[] = await this.wololoPlayerRepository.find({select: ["profileId"]});

        for (const player of playerProfileIds) {

            // Get the last game register
            let lastGame = (await this.wololoGameRepository.findOne({
                where: {profileId: player.profileId },
                order: {startedAt: "DESC"}
            }));

            const lastGameDate: string = lastGame ? lastGame.startedAt.toISOString() : sinceDate;

            const wololoPlayerGames = await this.wololoGamesApi.fetchPlayerGames(player.profileId, lastGameDate);

            const wololoPlayerGamesFiltered = wololoPlayerGames.filter(game => this.filterTeamGames(game, playerProfileIds));
            
            for (const game of wololoPlayerGamesFiltered) {
                const gameEntity = this.wololoGameRepository.create({
                    gameId: game.game_id,
                    profileId: player.profileId,
                    createdAt: new Date(game.created_at),
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

    }

    private filterTeamGames(game: any, playerProfileIds: WololoPlayerEntity[]): boolean {
        // Check if the team of the player are all player included in playerProfileIds
        const playerProfileIdSet = new Set(playerProfileIds.map(p => p.profileId));
        return game.teams.some(team => team.every(player => playerProfileIdSet.has(player.player.profile_id)));
    }
}