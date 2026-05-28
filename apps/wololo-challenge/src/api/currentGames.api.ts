import { CurrentGame } from '@aoe4.fr/shared-types';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' ? '/api' : 'https://aoe4.fr/api');

export function subscribeToCurrentGames(
    onUpdate: (games: CurrentGame[]) => void,
    onError: (err: Event) => void,
): EventSource {
    const source = new EventSource(`${API_BASE}/current-games/stream`);
    source.onmessage = (event) => {
        onUpdate(JSON.parse(event.data as string) as CurrentGame[]);
    };
    source.onerror = onError;
    return source;
}
