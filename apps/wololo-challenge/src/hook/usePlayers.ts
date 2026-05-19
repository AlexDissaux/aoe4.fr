import { useEffect, useState } from "react";
import { fetchWololoPlayers } from "../api/wololoPlayer.api";

export function usePlayers() {
    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        fetchWololoPlayers()
            .then(data => setPlayers(data.sort((a, b) => b.winRate - a.winRate)))
            .catch(console.error);
    }, []);

    return { players };
}

