export type WololoPlayer = {
    profileId: number;
    name: string;
    teamId: string;
    team: string;
    isCap: boolean;
    gamesCount: number;
    wins: number;
    losses: number;
    winRate: number;
    civsWon: string[];
    twitchLogin: string | null;
}