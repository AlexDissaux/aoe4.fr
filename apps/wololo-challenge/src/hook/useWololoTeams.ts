import { useEffect, useState } from 'react';
import { IWololoTeam } from '@aoe4.fr/shared-types';
import { fetchWololoTeams } from '../api/wololoTeam.api';

export function useWololoTeams(): IWololoTeam[] {
    const [teams, setTeams] = useState<IWololoTeam[]>([]);

    useEffect(() => {
        fetchWololoTeams()
            .then(setTeams)
            .catch(console.error);
    }, []);

    return teams;
}
