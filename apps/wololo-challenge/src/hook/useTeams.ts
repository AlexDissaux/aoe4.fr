import { useState, useEffect } from 'react';
import { IWololoTeamScore } from '@aoe4.fr/shared-types';
import { fetchWololoTeamScores } from '../api/wololoTeam.api';

export function useTeams() {
    const [teams, setTeams] = useState<IWololoTeamScore[]>([]);

    useEffect(() => {
        fetchWololoTeamScores()
            .then(setTeams)
            .catch(console.error);
    }, [])

    return { teams };
}