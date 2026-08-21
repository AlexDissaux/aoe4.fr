export interface IWololoCivContender {
    profileId: number;
    name: string;
    teamId: string;
    teamName: string;
    teamColor: string;
    wins: number;
}

export interface IWololoCivKingStanding {
    civ: string;
    king: IWololoCivContender | null;
    /** Top contenders for this civ, ranked by wins descending */
    leaderboard: IWololoCivContender[];
}
