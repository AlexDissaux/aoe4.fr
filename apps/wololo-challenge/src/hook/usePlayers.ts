import { useEffect, useState } from "react";
import { getAllPlayer } from "../api/player.service";
import { teamsNameAndId } from "../db/data";


export function usePlayers() {
    const [players, setPlayers] = useState<any[]>([])

    useEffect(() => {
        const fetchAllPlayers = async () => {
            const allPlayers: any[] = [];
            
            for (const team of teamsNameAndId) {
                const teamPlayers = await getAllPlayer(team.players, team.name, team.acronyme);
                allPlayers.push(...teamPlayers);
            }
            
            const sorted = allPlayers.sort((a, b) => b.modes.rm_solo.win_rate - a.modes.rm_solo.win_rate)
            setPlayers(sorted)
        }

        fetchAllPlayers()
    }, [])

    return { players }
}
