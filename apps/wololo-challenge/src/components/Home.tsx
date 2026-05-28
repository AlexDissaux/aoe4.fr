import Leaderboard from './leaderboard/Leaderboard'
import TwitchSection from './TwitchSection'
import PodiumLight from './podium/PodiumLight'
import Teasing from './Teasing'

export default function Home() {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-1/4"><Teasing /></div>
                <div className="w-full lg:w-1/2"><TwitchSection /></div>
                <div className="w-full lg:w-1/4"><PodiumLight /></div>
            </div>
            <Leaderboard />
        </>
    )
}
