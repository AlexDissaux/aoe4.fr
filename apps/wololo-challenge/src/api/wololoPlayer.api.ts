const API_BASE = '/api';

export async function fetchWololoPlayers(): Promise<any[]> {
    const response = await fetch(`${API_BASE}/wololoPlayer`);
    if (!response.ok) throw new Error('Failed to fetch wololo players');
    return response.json();
}
