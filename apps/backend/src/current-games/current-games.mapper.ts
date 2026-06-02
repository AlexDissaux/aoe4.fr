import { CurrentGame } from "@aoe4.fr/shared-types";
import { CurrentGamePlayerDto } from "./dto/current-games.dto";

export function toCurrentGameDto(game: any, profileId?: number, rankMap: Map<number, string | null> = new Map()): CurrentGame {
    const teams: any[][] = game?.teams ?? [];
    const orderedTeams = [...teams].sort((a) =>
            a.some(({ player }: any) => player.profile_id === profileId) ? -1 : 1);
    return {
        map: game.map,
        leaderboard: game.leaderboard,
        teams: orderedTeams.map((team: any) =>
            team.map(({ player }: any) => toCurrentGamePlayerDto(player, rankMap))
        ),
    };
}

export function toCurrentGamePlayerDto(player: any, rankMap: Map<number, string | null> = new Map()): CurrentGamePlayerDto {
    return {
        profileId: player.profile_id,
        name: player.name,
        civilization: player.civilization,
        civilization_randomized: player.civilization_randomized,
        country: player.country,
        rating: player.rating,
        rank_level: rankMap.get(player.profile_id) ?? null,
    };
}

