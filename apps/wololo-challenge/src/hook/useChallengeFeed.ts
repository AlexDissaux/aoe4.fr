import { useEffect, useState } from 'react';
import { IWololoChallengePointEntry } from '@aoe4.fr/shared-types';
import { fetchWololoChallengeFeed } from '../api/wololoChallengePoint.api';

export function useChallengeFeed() {
    const [feed, setFeed] = useState<IWololoChallengePointEntry[]>([]);

    useEffect(() => {
        fetchWololoChallengeFeed()
            .then(setFeed)
            .catch(console.error);
    }, []);

    return { feed };
}
