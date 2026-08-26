import { useEffect, useState } from 'react';
import { IWololoPlayerChallengeSummary } from '@aoe4.fr/shared-types';
import { fetchWololoChallengeSummaries } from '../api/wololoChallengePoint.api';

export function useChallengeSummaries() {
    const [summaries, setSummaries] = useState<IWololoPlayerChallengeSummary[]>([]);

    useEffect(() => {
        fetchWololoChallengeSummaries()
            .then(setSummaries)
            .catch(console.error);
    }, []);

    return { summaries };
}
