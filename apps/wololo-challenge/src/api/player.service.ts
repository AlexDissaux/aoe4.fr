import { sinceDate } from "../db/data";

// Cache to store player data by player ID
const playerCache = new Map<string, any>();

export async function getPlayer(playerId: string): Promise<any> {
    // Check if player data is already in cache
    if (playerCache.has(playerId)) {
        return playerCache.get(playerId)
    }

    // Fetch player data if not in cache
    
    const playerData = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}`)).json();
    const player = transformPlayerData(playerData, playerId);
    
    // Store in cache before returning
    playerCache.set(playerId, player)
    
    return player;
} 


const transformPlayerData = async (playerData: any, playerId: string) => {
    const playerGamesPage1 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=1`)).json();
    if (!playerData.modes) playerData.modes = {}
    // Remove [ODW] prefix from player name if present
    if (playerData.name.startsWith('[ODW] ') || playerData.name.startsWith('[ODW ]')  || playerData.name.startsWith('[ODG] ')) {
        playerData.name = playerData.name.substring(6);
    } else if (playerData.name.startsWith('[ODW]')) {
        playerData.name = playerData.name.substring(5);
    }

    if (playerGamesPage1.total_count === 0) {
        playerData.modes.rm_solo = {
            win_rate: 0,
            wins_count: 0,
            losses_count: 0,
            mmrChange: 0,
            mmrBeg: 0,
            mmrEnd: 0,
            nombreCivDiffJouer: 0
        }
    } else {
        let games = playerGamesPage1.games;
        if (playerGamesPage1.total_count > 50) {
            const playerGamesPage2 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=2`)).json();
            games.push(...playerGamesPage2.games)
        }
        if (playerGamesPage1.total_count > 100) {
            const playerGamesPage3 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=3`)).json();
            games.push(...playerGamesPage3.games)
        }
        
        // Filter out Bulky's cheat games before calculating civilizations
        let filteredGames = games;
        if (playerId === "8250217") {
            const cheatCivs = [
                'abbasid_dynasty', 'byzantines', 'chinese', 'delhi_sultanate', 'french',
                'golden_horde', 'house_of_lancaster', 'japanese', 'jeanne_darc', 'knights_templar',
                'macedonian_dynasty', 'malians', 'order_of_the_dragon', 'ottomans', 'rus',
                'sengoku_daimyo', 'tughlaq_dynasty', 'zhu_xis_legacy'
            ];
            
            let cheatGamesRemoved = 0;
            const remainingCheatCivs = [...cheatCivs];
            
            filteredGames = games.filter((game: any) => {
                const player = getOdwPlayer(game, playerId);
                const civIndex = remainingCheatCivs.indexOf(player.civilization);
                const isCheatGame = cheatGamesRemoved < 18 && 
                                   player.result === 'loss' && 
                                   civIndex !== -1;
                if (isCheatGame) {
                    cheatGamesRemoved++;
                    remainingCheatCivs.splice(civIndex, 1); // Remove this civ so it's only counted once
                    return false;
                }
                return true;
            });
        }
        
        // Wins and losses
        const [wins, losses] = getWinsAndLosses(games, playerId)
        const mmrData = getMmrChange(games, playerId)

        // RESULT
        playerData.modes.rm_solo = {
            win_rate: (wins / (wins + losses)) * 100,
            wins_count: wins,
            losses_count: losses,
            mmrChange: mmrData.change,
            mmrBeg: mmrData.mmrBeg,
            mmrEnd: mmrData.mmrEnd,
            nombreCivDiffJouer: getUniqueCivilizationsCount(filteredGames, playerId),
            civilizations: getUniqueCivilizations(filteredGames, playerId)
        }
    }

    // Adjustment for Bulky (ID: 8250217) - subtract 18 losses
    if (playerId === "8250217") {
        playerData.modes.rm_solo.losses_count = Math.max(0, playerData.modes.rm_solo.losses_count - 18);
    }

    playerData.modes.rm_solo.win_rate = Number(playerData.modes.rm_solo.win_rate).toFixed(1);
    return playerData;
}

export function getAllPlayer(players: any[], teamName: string, acronyme: string): Promise<any[]> {
    const promises = players.map(async(player) => {
        return {...await getPlayer(player.id),teamName: teamName, acronyme: acronyme, isCap: player.isCap  }
    });

    return Promise.all(promises);
}

const getWinsAndLosses = ((games: any, playerId: string) => 
    games.reduce(([wins, losses]: [number, number], game: any): [number, number] => {
            if (getOdwPlayer(game, playerId).result == "win") {
                return [wins + 1, losses]
            } else {
                return [wins, losses + 1]
            }
        }, [0, 0])
)

const getOdwPlayer = ((game: any, playerId: string) => game.teams.find((players: any) => players[0].player.profile_id == playerId)[0].player)

const getMmrChange = ((games: any, playerId: string) => {
    let mmrEnd;
    let mmrBeg;
    let ODWPlayer = getOdwPlayer(games.at(0), playerId)

    if (playerId === "18963110") {
        mmrEnd = ODWPlayer.rating + ODWPlayer.rating_diff
        mmrBeg = 700;
    } else {
        mmrEnd = ODWPlayer.mmr + ODWPlayer.mmr_diff
        ODWPlayer = getOdwPlayer(games.at(-1), playerId)
        mmrBeg = playerId === "11667821" ? 1172 : playerId === "21242620" ? 1100 :ODWPlayer.mmr
    }
    

    return {
        mmrBeg: mmrBeg,
        mmrEnd: mmrEnd,
        change: mmrEnd - mmrBeg
    };
})

const getUniqueCivilizations = ((games: any, playerId: string) => {
    // Récupère toutes les civilisations jouées par le joueur
    const civilizations = games.map((game: any) => {
        const player = getOdwPlayer(game, playerId);
        return player.civilization;
    });
    
    // Retourne la liste des civilisations uniques triées par ordre alphabétique
    const uniqueCivilizations = Array.from(new Set(civilizations)).sort();
    return uniqueCivilizations;
})

const getUniqueCivilizationsCount = ((games: any, playerId: string) => {
    // Récupère toutes les civilisations jouées par le joueur
    const civilizations = games.map((game: any) => {
        const player = getOdwPlayer(game, playerId);
        return player.civilization;
    });
    
    // Compte le nombre de civilisations uniques
    const uniqueCivilizations = new Set(civilizations);
    return uniqueCivilizations.size;
})