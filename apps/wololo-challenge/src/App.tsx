import './App.css'
import { Titre } from './components/Titre'
import Leaderboard from './components/Leaderboard'
import TwitchSection from './components/TwitchSection'
import PodiumLight from './components/podium/PodiumLight'
import Teasing from './components/Teasing'


function App() {

  return (
    <div className="min-h-screen bg-black">
      <div className="px-0 sm:px-3 py-8">
        <div className="w-full space-y-12">
          <Titre />
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/4"><Teasing /></div>
            <div className="w-full lg:w-1/2"><TwitchSection /></div>
            <div className="w-full lg:w-1/4"><PodiumLight /></div>
          </div>
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}

export default App
