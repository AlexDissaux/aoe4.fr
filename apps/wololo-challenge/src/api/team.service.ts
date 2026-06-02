import { fetchWololoPlayers } from "./wololoPlayer.api";

export interface TeamWinrate {
    win: number;
    lose: number;
    winRate: number;
}

export interface Team {
    teamId: string;
    name: string;
    players: any[];
    teamWinrate: TeamWinrate;
    totalGames: number;
    totalCivsWon: number;
    rankingPoints: number;
    pointsByDiscipline: {
        winrate: number;
        games: number;
        civs: number;
    };
}

export async function getAllTeams(): Promise<Team[]> {
    const players = await fetchWololoPlayers();

    // Grouper les joueurs par équipe
    const teamMap = new Map<string, any[]>();
    for (const player of players) {
        const existing = teamMap.get(player.teamId) ?? [];
        existing.push(player);
        teamMap.set(player.teamId, existing);
    }

    const teams: Team[] = [];
    for (const [teamId, teamPlayers] of teamMap.entries()) {
        const totalWins = teamPlayers.reduce((s, p) => s + p.wins, 0);
        const totalLosses = teamPlayers.reduce((s, p) => s + p.losses, 0);
        const totalGames = totalWins + totalLosses;
        const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 1000) / 10 : 0;
        const totalCivsWon = teamPlayers.reduce((s, p) => s + (p.civsWon?.length ?? 0), 0);

        teams.push({
            teamId,
            name: teamPlayers[0].team,
            players: teamPlayers,
            teamWinrate: { win: totalWins, lose: totalLosses, winRate },
            totalGames,
            totalCivsWon,
            rankingPoints: 0,
            pointsByDiscipline: { winrate: 0, games: 0, civs: 0 },
        });
    }

    calculateRankingPoints(teams);
    teams.sort((a, b) => b.rankingPoints - a.rankingPoints);

    return teams;
}

const calculateRankingPoints = (teams: Team[]) => {
    const n = teams.length;

    const byWinrate = [...teams].sort((a, b) => b.teamWinrate.winRate - a.teamWinrate.winRate);
    byWinrate.forEach((team, i) => {
        const pts = n - i;
        team.rankingPoints += pts;
        team.pointsByDiscipline.winrate = pts;
    });

    const byGames = [...teams].sort((a, b) => b.totalGames - a.totalGames);
    byGames.forEach((team, i) => {
        const pts = n - i;
        team.rankingPoints += pts;
        team.pointsByDiscipline.games = pts;
    });

    const byCivs = [...teams].sort((a, b) => b.totalCivsWon - a.totalCivsWon);
    byCivs.forEach((team, i) => {
        const pts = n - i;
        team.rankingPoints += pts;
        team.pointsByDiscipline.civs = pts;
    });
}