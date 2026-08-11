import { useEffect, useState } from "react";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { fetchWololoPlayers } from "../api/wololoPlayer.api";

export function usePlayers() {
    const [players, setPlayers] = useState<WololoPlayer[]>([]);

    useEffect(() => {
        fetchWololoPlayers()
            .then(data => setPlayers(data.sort((a, b) => b.wins - a.wins)))
            .catch(console.error);
    }, []);

    return { players };
}

