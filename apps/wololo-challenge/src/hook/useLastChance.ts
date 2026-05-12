import { useEffect, useState } from "react";
import { LastChanceTeam, getLastChanceData } from "../api/lastChance.service";

export function useLastChance() {
    const [teams, setTeams] = useState<LastChanceTeam[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLastChanceData().then((data) => {
            setTeams(data);
            setLoading(false);
        });
    }, []);

    return { teams, loading };
}
