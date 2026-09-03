import { IWololoTeam, IWololoTeamCategoryScore, IWololoTeamScore, IWololoTierBadgeStanding, IWololoTierClaim, IWololoCivKingStanding, IWololoChallengePointEntry, WololoPlayer } from '@aoe4.fr/shared-types';
import { KING_POINTS } from './wololo-king.scoring';

interface TeamAggregate {
    teamId: string;
    name: string;
    color: string;
    captainName: string | null;
    totalWins: number;
    totalCivs: number;
    totalMaps: number;
    winDates: string[];
}

// Win-count thresholds that award a team badge, worth flat points each.
export const WIN_TIERS = [25, 100, 200, 300, 400, 500, 700, 1000] as const;
export const TIER_BADGE_POINTS = 5;
export const MAX_BADGES_PER_TIER = 10;

export function computeWololoTeamScores(
    teams: IWololoTeam[],
    players: WololoPlayer[],
    civKingStandings: IWololoCivKingStanding[],
    challengeEntries: IWololoChallengePointEntry[],
): IWololoTeamScore[] {
    const aggregates = aggregateByTeam(teams, players);

    const winsRanking = rankByCategory(aggregates, (a) => a.totalWins);
    const civsRanking = rankByCategory(aggregates, (a) => a.totalCivs);
    const mapsRanking = rankByCategory(aggregates, (a) => a.totalMaps);
    const tierScores = computeTierScores(aggregates);
    const kingScores = computeKingScores(aggregates, civKingStandings);
    const challengeScores = computeChallengeScores(players, challengeEntries);

    const scores: IWololoTeamScore[] = aggregates.map((agg) => {
        const wins = winsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        const civs = civsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        const maps = mapsRanking.get(agg.teamId) as IWololoTeamCategoryScore;
        const tiers = tierScores.get(agg.teamId) ?? { points: 0, badges: [] };
        const kings = kingScores.get(agg.teamId) ?? { points: 0, civs: [] };
        const challenges = challengeScores.get(agg.teamId) ?? { points: 0, entries: [] };
        return {
            teamId: agg.teamId,
            name: agg.name,
            color: agg.color,
            captainName: agg.captainName,
            totalPoints: wins.points + civs.points + maps.points + tiers.points + kings.points + challenges.points,
            rank: 0,
            categories: { wins, civs, maps },
            tiers,
            kings,
            challenges,
        };
    });

    scores.sort((a, b) => b.totalPoints - a.totalPoints);
    assignStandardRanks(scores, (s) => s.totalPoints, (s, rank) => { s.rank = rank; });

    return scores;
}

function computeKingScores(
    aggregates: TeamAggregate[],
    civKingStandings: IWololoCivKingStanding[],
): Map<string, { points: number; civs: string[] }> {
    const result = new Map<string, { points: number; civs: string[] }>(
        aggregates.map((agg) => [agg.teamId, { points: 0, civs: [] }]),
    );

    for (const standing of civKingStandings) {
        if (!standing.king) continue;
        const teamKings = result.get(standing.king.teamId);
        if (!teamKings) continue;
        teamKings.civs.push(standing.civ);
        teamKings.points += KING_POINTS;
    }

    return result;
}

// Sums admin-awarded challenge points per team, resolving each entry's team via its player.
function computeChallengeScores(
    players: WololoPlayer[],
    challengeEntries: IWololoChallengePointEntry[],
): Map<string, { points: number; entries: IWololoChallengePointEntry[] }> {
    const teamIdByProfileId = new Map(players.map((p) => [p.profileId, p.teamId]));
    const result = new Map<string, { points: number; entries: IWololoChallengePointEntry[] }>();

    for (const entry of challengeEntries) {
        const teamId = teamIdByProfileId.get(entry.profileId);
        if (!teamId) continue;
        const teamChallenges = result.get(teamId) ?? { points: 0, entries: [] };
        teamChallenges.points += entry.points;
        teamChallenges.entries.push(entry);
        result.set(teamId, teamChallenges);
    }

    return result;
}

// For each win-tier, finds the date a team reached it (Nth win's finish date) and awards
// a badge to the first MAX_BADGES_PER_TIER teams to reach it, ranked by that date.
export function computeWololoTierStandings(teams: IWololoTeam[], players: WololoPlayer[]): IWololoTierBadgeStanding[] {
    const aggregates = aggregateByTeam(teams, players);

    return WIN_TIERS.map((threshold) => {
        const reached = aggregates
            .map((agg) => ({ agg, reachedAt: agg.winDates[threshold - 1] }))
            .filter((r): r is { agg: TeamAggregate; reachedAt: string } => !!r.reachedAt)
            .sort((a, b) => a.reachedAt.localeCompare(b.reachedAt) || a.agg.teamId.localeCompare(b.agg.teamId));

        const claimed: IWololoTierClaim[] = reached.slice(0, MAX_BADGES_PER_TIER).map(({ agg, reachedAt }) => ({
            teamId: agg.teamId,
            name: agg.name,
            color: agg.color,
            reachedAt,
        }));

        return { threshold, claimed, remaining: MAX_BADGES_PER_TIER - claimed.length };
    });
}

function computeTierScores(aggregates: TeamAggregate[]): Map<string, { points: number; badges: number[] }> {
    const result = new Map<string, { points: number; badges: number[] }>(
        aggregates.map((agg) => [agg.teamId, { points: 0, badges: [] }]),
    );

    for (const threshold of WIN_TIERS) {
        const reached = aggregates
            .map((agg) => ({ teamId: agg.teamId, reachedAt: agg.winDates[threshold - 1] }))
            .filter((r): r is { teamId: string; reachedAt: string } => !!r.reachedAt)
            .sort((a, b) => a.reachedAt.localeCompare(b.reachedAt) || a.teamId.localeCompare(b.teamId));

        for (const { teamId } of reached.slice(0, MAX_BADGES_PER_TIER)) {
            const teamTiers = result.get(teamId);
            if (!teamTiers) continue;
            teamTiers.badges.push(threshold);
            teamTiers.points += TIER_BADGE_POINTS;
        }
    }

    return result;
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
            winDates: teamPlayers.flatMap((p) => p.winDates ?? []).sort(),
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
