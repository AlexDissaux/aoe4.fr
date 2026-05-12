import { useEffect, useState } from "react";
import { BelgianPlayer, getTop3BelgianPlayers } from "../api/leaderboard.service";

export function useBelgianLeaderboard() {
    const [players, setPlayers] = useState<BelgianPlayer[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTop3BelgianPlayers().then((data) => {
            setPlayers(data);
            setLoading(false);
        });
    }, []);

    return { players, loading };
}
