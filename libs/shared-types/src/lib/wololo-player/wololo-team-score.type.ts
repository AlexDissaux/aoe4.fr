import { IWololoChallengePointEntry } from './wololo-challenge-point.type';

export interface IWololoTeamCategoryScore {
    total: number;
    points: number;
    rank: number;
}

export interface IWololoTeamTierScore {
    points: number;
    /** Win thresholds this team has claimed a badge for, e.g. [25, 100] */
    badges: number[];
}

export interface IWololoTeamKingsScore {
    points: number;
    /** Civilization keys this team currently holds the crown for */
    civs: string[];
}

export interface IWololoTeamChallengeScore {
    points: number;
    entries: IWololoChallengePointEntry[];
}

export interface IWololoTeamScore {
    teamId: string;
    name: string;
    color: string;
    captainName: string | null;
    totalPoints: number;
    rank: number;
    categories: {
        wins: IWololoTeamCategoryScore;
        civs: IWololoTeamCategoryScore;
        maps: IWololoTeamCategoryScore;
    };
    tiers: IWololoTeamTierScore;
    kings: IWololoTeamKingsScore;
    challenges: IWololoTeamChallengeScore;
}

export interface IWololoTierClaim {
    teamId: string;
    name: string;
    color: string;
    /** ISO date of the team's Nth win that reached this tier */
    reachedAt: string;
}

export interface IWololoTierBadgeStanding {
    threshold: number;
    claimed: IWololoTierClaim[];
    remaining: number;
}
