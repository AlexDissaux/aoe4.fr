import { WololoPlayer } from "@aoe4.fr/shared-types";
import { WololoPlayerRaw } from "./wololo-player.api";


// export function toWololoPlayer(raw: WololoPlayerRaw): WololoPlayer {
//     const wins = raw.games.filter(g => getPlayerResult(g, raw.profileId) === 'win').length;
//     const losses = raw.games.filter(g => getPlayerResult(g, raw.profileId) === 'loss').length;
//     const total = wins + losses;

//     return {
//         profileId: raw.profileId,
//         name: raw.name,
//         teamId: raw.teamId,
//         team: raw.team,
//         isCap: raw.isCap,
//         gamesCount: total,
//         wins,
//         winRate: total > 0 ? Math.round((wins / total) * 1000) / 10 : 0,
//         civsWon: getWonCivs(raw.games, raw.profileId),
//         twitchLogin: raw.twitchLogin,
//     };
}
