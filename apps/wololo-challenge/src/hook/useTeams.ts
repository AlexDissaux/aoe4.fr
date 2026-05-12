import { useState, useEffect } from 'react';
import { getAllTeams, Team } from '../api/team.service';


export function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fillTeams = (async() => {
            setTeams(await getAllTeams())
        })
        fillTeams()
    }, [])

    return { teams };
}