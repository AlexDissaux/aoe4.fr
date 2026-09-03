import { IWololoGamesStats } from '@aoe4.fr/shared-types';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' ? '/api' : 'https://aoe4.fr/api');

export async function fetchWololoGamesStats(): Promise<IWololoGamesStats> {
    const response = await fetch(`${API_BASE}/wololo-games/stats`);
    if (!response.ok) throw new Error('Failed to fetch wololo games stats');
    return response.json();
}
