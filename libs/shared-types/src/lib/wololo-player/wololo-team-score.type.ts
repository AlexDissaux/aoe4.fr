export interface IWololoTeamCategoryScore {
    total: number;
    points: number;
    rank: number;
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
}
