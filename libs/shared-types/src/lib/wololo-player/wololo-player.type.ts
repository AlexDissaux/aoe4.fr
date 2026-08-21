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
    /** Win count per civilization key, e.g. { english: 5, mongols: 2 } */
    civWins: Record<string, number>;
}