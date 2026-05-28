import { useState, useEffect } from 'react';
import { CurrentGame } from '@aoe4.fr/shared-types';
import { subscribeToCurrentGames } from '../api/currentGames.api';

/**
 * Returns a Map<playerNameLowercase, CurrentGame> for all players currently in game.
 * Includes players from both teams of every tracked game.
 */
export function useWololoCurrentGames(): Map<string, CurrentGame> {
    const [gamesMap, setGamesMap] = useState<Map<string, CurrentGame>>(new Map());

    useEffect(() => {
        const source = subscribeToCurrentGames(
            (games) => {
                const map = new Map<string, CurrentGame>();
                for (const game of games) {
                    for (const team of game.teams) {
                        for (const player of team) {
                            map.set(player.name.toLowerCase(), game);
                        }
                    }
                }
                setGamesMap(map);
            },
            () => {
                // SSE error — keep current state, will auto-reconnect
            },
        );
        return () => source.close();
    }, []);

    return gamesMap;
}
