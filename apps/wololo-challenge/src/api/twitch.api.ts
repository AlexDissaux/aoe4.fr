import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' ? '/api' : 'https://aoe4.fr/api');

export async function fetchTwitchStreams(): Promise<ITwitchStream[]> {
    const response = await fetch(`${API_BASE}/wololoPlayer/streams`);
    if (!response.ok) throw new Error('Failed to fetch Twitch streams');
    return response.json();
}

export async function fetchTwitchVods(): Promise<ITwitchVod[]> {
    const response = await fetch(`${API_BASE}/wololoPlayer/vods`);
    if (!response.ok) throw new Error('Failed to fetch Twitch VODs');
    return response.json();
}
