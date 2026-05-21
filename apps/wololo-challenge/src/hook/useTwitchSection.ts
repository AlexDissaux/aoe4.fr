import { useEffect, useState } from 'react';
import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';
import { fetchTwitchStreams, fetchTwitchVods } from '../api/twitch.api';

export type TwitchSectionState =
    | { status: 'loading' }
    | { status: 'live'; streams: ITwitchStream[]; selected: ITwitchStream }
    | { status: 'vod'; vod: ITwitchVod }
    | { status: 'offline' };

export function useTwitchSection(): TwitchSectionState {
    const [state, setState] = useState<TwitchSectionState>({ status: 'loading' });

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const [streams, vods] = await Promise.all([
                    fetchTwitchStreams(),
                    fetchTwitchVods(),
                ]);

                if (cancelled) return;

                if (streams.length > 0) {
                    setState({ status: 'live', streams, selected: streams[0] });
                } else if (vods.length > 0) {
                    setState({ status: 'vod', vod: vods[0] });
                } else {
                    setState({ status: 'offline' });
                }
            } catch {
                if (!cancelled) setState({ status: 'offline' });
            }
        })();

        return () => { cancelled = true; };
    }, []);

    return state;
}
