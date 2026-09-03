import { useEffect, useState } from 'react';
import { fetchWololoGamesStats } from '../api/wololoGames.api';

export function useTotalGamesCount(): number | null {
    const [totalGames, setTotalGames] = useState<number | null>(null);

    useEffect(() => {
        fetchWololoGamesStats()
            .then((stats) => setTotalGames(stats.totalGames))
            .catch(console.error);
    }, []);

    return totalGames;
}
