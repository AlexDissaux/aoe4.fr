import { IWololoChallengePointEntry, IWololoPlayerChallengeSummary } from '@aoe4.fr/shared-types';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' ? '/api' : 'https://aoe4.fr/api');

export async function fetchWololoChallengeFeed(): Promise<IWololoChallengePointEntry[]> {
    const response = await fetch(`${API_BASE}/wololo-challenge-points`);
    if (!response.ok) throw new Error('Failed to fetch wololo challenge feed');
    return response.json();
}

export async function fetchWololoChallengeSummaries(): Promise<IWololoPlayerChallengeSummary[]> {
    const response = await fetch(`${API_BASE}/wololo-challenge-points/players`);
    if (!response.ok) throw new Error('Failed to fetch wololo challenge summaries');
    return response.json();
}
