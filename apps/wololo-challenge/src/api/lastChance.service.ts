import { teamsNameAndId } from "../db/data";

export interface LastChanceTeam {
    name: string;
    acronyme: string;
    totalGames: number;
    points: number;
    allGames: any[]; // Toutes les games de l'équipe avec timestamps
    timestampAt50?: Date;
    timestampAt100?: Date;
    timestampAt150?: Date;
    milestones: {
        milestone50: boolean;
        milestone100: boolean;
        milestone150: boolean;
        firstAt50: boolean;
        firstAt100: boolean;
        firstAt150: boolean;
    };
}

const LAST_CHANCE_START = '2025-11-20T23:00:00.000Z';
const LAST_CHANCE_END = '2025-11-23T23:00:00.000Z'; // Jusqu'au 23/11 23:59:59

export async function getLastChanceData(): Promise<LastChanceTeam[]> {
    const teams: LastChanceTeam[] = [];

    // Récupérer les games pour chaque équipe
    for (let team of teamsNameAndId) {
        const allGames: any[] = [];

        for (let player of team.players) {
            const games = await fetchPlayerGames(player.id);
            allGames.push(...games);
        }

        // Trier toutes les games par date (du plus ancien au plus récent)
        allGames.sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime());

        // Déterminer les timestamps pour chaque palier
        const timestampAt50 = allGames.length >= 50 ? new Date(allGames[49].started_at) : undefined;
        const timestampAt100 = allGames.length >= 100 ? new Date(allGames[99].started_at) : undefined;
        const timestampAt150 = allGames.length >= 150 ? new Date(allGames[149].started_at) : undefined;

        teams.push({
            name: team.name,
            acronyme: team.acronyme,
            totalGames: allGames.length,
            allGames: allGames,
            timestampAt50,
            timestampAt100,
            timestampAt150,
            points: 0,
            milestones: {
                milestone50: false,
                milestone100: false,
                milestone150: false,
                firstAt50: false,
                firstAt100: false,
                firstAt150: false,
            }
        });
    }

    // Calculer les points et déterminer les premières équipes pour chaque palier
    calculateLastChancePoints(teams);

    // Trier par points décroissants puis par nombre de games décroissantes
    teams.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        return b.totalGames - a.totalGames;
    });

    return teams;
}

async function fetchPlayerGames(playerId: string): Promise<any[]> {
    try {
        let allGames: any[] = [];
        let page = 1;
        let hasMoreGames = true;

        while (hasMoreGames) {
            const response = await fetch(
                `https://aoe4world.com/api/v0/players/${playerId}/games?since=${LAST_CHANCE_START}&leaderboard=rm_solo&page=${page}`
            );
            const data = await response.json();

            if (!data.games || data.games.length === 0) {
                hasMoreGames = false;
                break;
            }

            // Filtrer les games dans la période Last Chance
            const validGames = data.games.filter((game: any) => {
                const gameDate = new Date(game.started_at);
                const startDate = new Date(LAST_CHANCE_START);
                const endDate = new Date(LAST_CHANCE_END);
                return gameDate >= startDate && gameDate < endDate;
            });

            allGames.push(...validGames);

            // Si on a moins de 50 games sur cette page, on a atteint la fin
            if (data.games.length < 50) {
                hasMoreGames = false;
            } else {
                page++;
            }
        }

        return allGames;
    } catch (error) {
        console.error(`Error fetching games for player ${playerId}:`, error);
        return [];
    }
}

function calculateLastChancePoints(teams: LastChanceTeam[]) {
    // Trouver la première équipe à atteindre chaque palier chronologiquement
    let firstAt50: string | null = null;
    let firstAt100: string | null = null;
    let firstAt150: string | null = null;
    let earliestAt50: Date | null = null;
    let earliestAt100: Date | null = null;
    let earliestAt150: Date | null = null;

    // Palier 50
    for (let team of teams) {
        if (team.timestampAt50 && (!earliestAt50 || team.timestampAt50 < earliestAt50)) {
            earliestAt50 = team.timestampAt50;
            firstAt50 = team.acronyme;
        }
    }

    // Palier 100
    for (let team of teams) {
        if (team.timestampAt100 && (!earliestAt100 || team.timestampAt100 < earliestAt100)) {
            earliestAt100 = team.timestampAt100;
            firstAt100 = team.acronyme;
        }
    }

    // Palier 150
    for (let team of teams) {
        if (team.timestampAt150 && (!earliestAt150 || team.timestampAt150 < earliestAt150)) {
            earliestAt150 = team.timestampAt150;
            firstAt150 = team.acronyme;
        }
    }

    // Calculer les points pour chaque équipe
    for (let team of teams) {
        let points = 0;

        // Palier 50 games
        if (team.totalGames >= 50) {
            team.milestones.milestone50 = true;
            points += 1;
            if (team.acronyme === firstAt50) {
                team.milestones.firstAt50 = true;
                points += 1;
            }
        }

        // Palier 100 games
        if (team.totalGames >= 100) {
            team.milestones.milestone100 = true;
            points += 1;
            if (team.acronyme === firstAt100) {
                team.milestones.firstAt100 = true;
                points += 1;
            }
        }

        // Palier 150 games
        if (team.totalGames >= 150) {
            team.milestones.milestone150 = true;
            points += 1;
            if (team.acronyme === firstAt150) {
                team.milestones.firstAt150 = true;
                points += 1;
            }
        }

        team.points = points;
    }
}
