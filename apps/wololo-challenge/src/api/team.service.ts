import { teamsNameAndId } from "../db/data";
import { getPlayer } from "./player.service"
import { getLastChanceData } from "./lastChance.service"



export interface Team {
    name: string;
    players: any[];
    teamWinrate : TeamWinrate;
    totalGames: number;
    bestMmrChange: number;
    totalCivDiversity: number;
    challengePoints: number;
    lastChancePoints: number;
    rankingPoints: number;
    pointsByDiscipline: {
        winrate: number;
        games: number;
        mmr: number;
        civs: number;
        challenges: number;
        lastChance: number;
    };
}

export interface TeamWinrate {
    win: number;
    lose: number;
    winRate: number;
}



export async function getAllTeams(): Promise<Team[]> {
    const teams = [];

    // Récupérer les données Last Chance
    const lastChanceData = await getLastChanceData();
    const lastChanceMap = new Map(lastChanceData.map(lc => [lc.acronyme, lc.points]));

    for (let team of teamsNameAndId) {
        const playersData = await Promise.all(
            team.players.map(async (player) => {
                return {...await getPlayer(player.id), isCap: player.isCap}}
            )
        );
        
        const teamWinrate = computeTeamWinrate(playersData);
        const bestMmrChange = getBestMmrChange(playersData);
        const totalCivDiversity = getTotalCivDiversity(playersData);
        const lastChancePoints = lastChanceMap.get(team.acronyme) || 0;
        teams.push({
            name: team.name,
            players: playersData,
            teamWinrate: teamWinrate,
            totalGames: teamWinrate.win + teamWinrate.lose,
            bestMmrChange: bestMmrChange,
            totalCivDiversity: totalCivDiversity,
            challengePoints: team.points, // Points de défis depuis data.ts
            lastChancePoints: lastChancePoints,
            rankingPoints: 0, // sera calculé après
            pointsByDiscipline: {
                winrate: 0,
                games: 0,
                mmr: 0,
                civs: 0,
                challenges: team.points,
                lastChance: lastChancePoints
            }
        });
    }

    // Calculer les points de classement
    calculateRankingPoints(teams);

    // Trier les équipes par points de classement (du plus haut au plus bas)
    teams.sort((a, b) => b.rankingPoints - a.rankingPoints);

    return teams;
}

const computeTeamWinrate = (playersData: any[]): TeamWinrate => {
    const totalWins = playersData.reduce((sum, player) => sum + player.modes.rm_solo.wins_count, 0);
    const totalLosses = playersData.reduce((sum, player) => sum + player.modes.rm_solo.losses_count, 0);
    
    // Calculer la moyenne des winrates individuels
    const averageWinRate = playersData.reduce((sum, player) => sum + parseFloat(player.modes.rm_solo.win_rate), 0) / playersData.length;
    const winRate = Number(averageWinRate.toFixed(1));

    return {
        win: totalWins,
        lose: totalLosses,
        winRate: winRate
    };
}

const getBestMmrChange = (playersData: any[]): number => {
    // Trouve le meilleur mmrChange parmi tous les joueurs de l'équipe
    const bestChange = Math.max(...playersData.map(player => player.modes.rm_solo.mmrChange || 0));
    return bestChange;
}

const getTotalCivDiversity = (playersData: any[]): number => {
    // Additionne le nombre de civilisations différentes jouées par chaque joueur de l'équipe
    const totalCivs = playersData.reduce((sum, player) => sum + (player.modes.rm_solo.nombreCivDiffJouer || 0), 0);
    return totalCivs;
}

const calculateRankingPoints = (teams: any[]) => {
    const numberOfTeams = teams.length;
    
    // Classement par winrate
    const teamsByWinrate = [...teams].sort((a, b) => b.teamWinrate.winRate - a.teamWinrate.winRate);
    teamsByWinrate.forEach((team, index) => {
        const points = numberOfTeams - index;
        team.rankingPoints += points;
        team.pointsByDiscipline.winrate = points;
    });
    
    // Classement par nombre de parties
    const teamsByGames = [...teams].sort((a, b) => b.totalGames - a.totalGames);
    teamsByGames.forEach((team, index) => {
        const points = numberOfTeams - index;
        team.rankingPoints += points;
        team.pointsByDiscipline.games = points;
    });
    
    // Classement par meilleur MMR change
    const teamsByMmrChange = [...teams].sort((a, b) => b.bestMmrChange - a.bestMmrChange);
    teamsByMmrChange.forEach((team, index) => {
        const points = numberOfTeams - index;
        team.rankingPoints += points;
        team.pointsByDiscipline.mmr = points;
    });
    
    // Classement par diversité de civilisations
    const teamsByCivDiversity = [...teams].sort((a, b) => b.totalCivDiversity - a.totalCivDiversity);
    teamsByCivDiversity.forEach((team, index) => {
        const points = numberOfTeams - index;
        team.rankingPoints += points;
        team.pointsByDiscipline.civs = points;
    });
    
    // Ajouter les points de défis et Last Chance au score total
    teams.forEach(team => {
        team.rankingPoints += team.challengePoints;
        team.rankingPoints += team.lastChancePoints;
    });
}