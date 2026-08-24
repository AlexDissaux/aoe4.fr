export interface IWololoCivContender {
    profileId: number;
    name: string;
    teamId: string;
    teamName: string;
    teamColor: string;
    wins: number;
    /** Set when this contender already holds the crown of another civ, so they don't count for this one */
    alreadyKingOf?: string | null;
}

export interface IWololoCivKingStanding {
    civ: string;
    king: IWololoCivContender | null;
    /** Top contenders for this civ, ranked by wins descending */
    leaderboard: IWololoCivContender[];
}
