export interface BelgianPlayer {
    name: string;
    profile_id: number;
    rating: number;
    rank: number;
    games_count: number;
    wins_count: number;
    losses_count: number;
    win_rate: number;
    avatars: {
        small: string;
        medium: string;
        full: string;
    };
}

export async function getTop3BelgianPlayers(): Promise<BelgianPlayer[]> {
    try {
        const response = await fetch('https://aoe4world.com/api/v0/leaderboards/rm_solo?country=be');
        const data = await response.json();
        
        // Récupérer les 3 premiers joueurs
        const top3 = data.players.slice(0, 3).map((player: any) => ({
            name: player.name,
            profile_id: player.profile_id,
            rating: player.rating,
            rank: player.rank,
            games_count: player.games_count,
            wins_count: player.wins_count,
            losses_count: player.losses_count,
            win_rate: player.win_rate,
            avatars: player.avatars
        }));
        
        return top3;
    } catch (error) {
        console.error('Error fetching Belgian leaderboard:', error);
        return [];
    }
}
