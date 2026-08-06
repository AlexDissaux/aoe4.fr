import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './components/Home'
import Podium from './components/podium/Podium'
import Leaderboard from './components/leaderboard/Leaderboard'
import Rules from './components/Rules'
import LiveGames from './components/live-games/LiveGames'
import CompteARebours from './components/CompteARebours'


function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1c1208_0%,_#0d0d0d_45%,_#000000_100%)]">
      {/* <Header /> */}
      <div className="px-0 sm:px-3 py-8">
        <Routes>
          <Route path="/" element={<CompteARebours />} />
          <Route path="/test" element={<Home />} />
          <Route path="/podium" element={<Podium />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/live" element={<LiveGames />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
