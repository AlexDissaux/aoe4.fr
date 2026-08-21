import { useEffect, useState } from 'react';
import { IWololoCivKingStanding } from '@aoe4.fr/shared-types';
import { fetchWololoCivKingStandings } from '../api/wololoTeam.api';

export function useCivKingStandings() {
    const [standings, setStandings] = useState<IWololoCivKingStanding[]>([]);

    useEffect(() => {
        fetchWololoCivKingStandings()
            .then(setStandings)
            .catch(console.error);
    }, []);

    return { standings };
}
