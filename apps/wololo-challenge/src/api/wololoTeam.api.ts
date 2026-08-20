import { IWololoTeam, IWololoTeamScore, IWololoTierBadgeStanding } from '@aoe4.fr/shared-types';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' ? '/api' : 'https://aoe4.fr/api');

export async function fetchWololoTeams(): Promise<IWololoTeam[]> {
    const response = await fetch(`${API_BASE}/wololo-teams`);
    if (!response.ok) throw new Error('Failed to fetch wololo teams');
    return response.json();
}

export async function fetchWololoTeamScores(): Promise<IWololoTeamScore[]> {
    const response = await fetch(`${API_BASE}/wololo-teams/scores`);
    if (!response.ok) throw new Error('Failed to fetch wololo team scores');
    return response.json();
}

export async function fetchWololoTierStandings(): Promise<IWololoTierBadgeStanding[]> {
    const response = await fetch(`${API_BASE}/wololo-teams/tiers`);
    if (!response.ok) throw new Error('Failed to fetch wololo tier standings');
    return response.json();
}
