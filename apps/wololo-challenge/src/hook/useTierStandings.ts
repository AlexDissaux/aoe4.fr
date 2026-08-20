import { useEffect, useState } from 'react';
import { IWololoTierBadgeStanding } from '@aoe4.fr/shared-types';
import { fetchWololoTierStandings } from '../api/wololoTeam.api';

export function useTierStandings() {
    const [standings, setStandings] = useState<IWololoTierBadgeStanding[]>([]);

    useEffect(() => {
        fetchWololoTierStandings()
            .then(setStandings)
            .catch(console.error);
    }, []);

    return { standings };
}
