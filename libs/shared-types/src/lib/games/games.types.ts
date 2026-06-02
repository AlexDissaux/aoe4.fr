export interface CurrentGamePlayer {
  profileId: number;
  name: string;
  civilization: string;
  civilization_randomized: boolean;
  country: string;
  rating: number | null;
  rank_level: string | null;
}

export interface CurrentGame {
  map: string;
  leaderboard: string;
  teams: CurrentGamePlayer[][];
}
