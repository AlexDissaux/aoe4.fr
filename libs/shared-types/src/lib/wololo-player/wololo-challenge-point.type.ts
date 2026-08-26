export interface IWololoChallengePointEntry {
    id: number;
    profileId: number;
    playerName: string;
    teamId: string;
    teamName: string;
    teamColor: string;
    points: number;
    label: string;
    createdAt: string;
}

export interface IWololoPlayerChallengeSummary {
    profileId: number;
    playerName: string;
    teamId: string;
    teamName: string;
    teamColor: string;
    totalPoints: number;
    entries: IWololoChallengePointEntry[];
}
