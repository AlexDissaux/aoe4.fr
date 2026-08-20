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
