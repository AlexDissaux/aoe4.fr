import { IWololoTeam, IWololoTeamCategoryScore, IWololoTeamScore, WololoPlayer } from '@aoe4.fr/shared-types';

interface TeamAggregate {
    teamId: string;
    name: string;
    color: string;
    captainName: string | null;
    totalWins: number;
    totalCivs: number;
    totalMaps: number;
}

export function computeWololoTeamScores(teams: IWololoTeam[], players: WololoPlayer[]): IWololoTeamScore[] {
    const aggregates = aggregateByTeam(teams, players);

    const winsRanking = rankByCategory(aggregates, (a) => a.totalWins);
    const civsRanking = rankByCategory(aggregates, (a) => a.totalCivs);
    const mapsRanking = rankByCategory(aggregates, (a) => a.totalMaps);

    const scores: IWololoTeamScore[] = aggregates.map((agg) => {
        const wins = winsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        const civs = civsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        const maps = mapsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        return {
            teamId: agg.teamId,
            name: agg.name,
            color: agg.color,
            captainName: agg.captainName,
            totalPoints: wins.points + civs.points + maps.points,
            rank: 0,
            categories: { wins, civs, maps },
        };
    });

    scores.sort((a, b) => b.totalPoints - a.totalPoints);
    assignStandardRanks(scores, (s) => s.totalPoints, (s, rank) => { s.rank = rank; });

    return scores;
}

function aggregateByTeam(teams: IWololoTeam[], players: WololoPlayer[]): TeamAggregate[] {
    const playersByTeam = new Map<string, WololoPlayer[]>();
    for (const player of players) {
        const existing = playersByTeam.get(player.teamId) ?? [];
        existing.push(player);
        playersByTeam.set(player.teamId, existing);
    }

    return teams.map((team) => {
        const teamPlayers = playersByTeam.get(team.id) ?? [];
        return {
            teamId: team.id,
            name: team.name,
            color: team.color,
            captainName: teamPlayers.find((p) => p.isCap)?.name ?? null,
            totalWins: teamPlayers.reduce((sum, p) => sum + p.wins, 0),
            totalCivs: teamPlayers.reduce((sum, p) => sum + (p.civsWon?.length ?? 0), 0),
            totalMaps: teamPlayers.reduce((sum, p) => sum + (p.mapsWon?.length ?? 0), 0),
        };
    });
}

// Standard competition ranking (1224): tied values share the same rank and points, next rank skips accordingly.
function rankByCategory(
    aggregates: TeamAggregate[],
    getValue: (agg: TeamAggregate) => number,
): Map<string, IWololoTeamCategoryScore> {
    const n = aggregates.length;
    const sorted = [...aggregates].sort((a, b) => getValue(b) - getValue(a));

    const result = new Map<string, IWololoTeamCategoryScore>();
    let previousValue: number | null = null;
    let previousRank = 0;
    sorted.forEach((agg, index) => {
        const value = getValue(agg);
        const rank = value === previousValue ? previousRank : index + 1;
        result.set(agg.teamId, { total: value, points: n - rank + 1, rank });
        previousValue = value;
        previousRank = rank;
    });

    return result;
}

function assignStandardRanks<T>(items: T[], getValue: (item: T) => number, setRank: (item: T, rank: number) => void): void {
    let previousValue: number | null = null;
    let previousRank = 0;
    items.forEach((item, index) => {
        const value = getValue(item);
        const rank = value === previousValue ? previousRank : index + 1;
        setRank(item, rank);
        previousValue = value;
        previousRank = rank;
    });
}
