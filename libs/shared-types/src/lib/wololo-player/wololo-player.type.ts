export type WololoPlayer = {
    profileId: number;
    name: string;
    teamId: string;
    team: string;
    isCap: boolean;
    gamesCount: number;
    wins: number;
    civsWon: string[];
    mapsWon: string[];
    twitchLogin: string | null;
    winDates: string[];
}