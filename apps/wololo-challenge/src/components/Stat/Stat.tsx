import { useState } from "react";
import Separator from "./Separator";
import Teams from "./Team";
import Player from "./Player";
import Podium from "../Podium";


export default function Stat() {
    const [view, setView] = useState<'podium' | 'teams' | 'players'>('podium');

    return (
        <>
            <Separator view={view} onViewChange={setView} />
            {view === 'podium' && <Podium />}
            {view === 'teams' && <Teams />}
            {view === 'players' && <Player />}
        </>
    )

}