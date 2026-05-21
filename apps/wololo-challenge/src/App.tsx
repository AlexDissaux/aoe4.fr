import './App.css'
import { Titre } from './components/Titre'
import Podium from './components/Podium'
import Leaderboard from './components/Leaderboard'
import TwitchSection from './components/TwitchSection'


function App() {

  return (
    <div className="min-h-screen bg-black">
      <div className="px-0 sm:px-3 py-8">
        <div className="w-full space-y-12">
          <Titre />
          <TwitchSection />
          <Podium />
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}

export default App
