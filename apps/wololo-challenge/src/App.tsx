import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './components/Home'
import Podium from './components/podium/Podium'
import Leaderboard from './components/leaderboard/Leaderboard'
import Milestones from './components/milestones/Milestones'
import Rules from './components/Rules'
import LiveGames from './components/live-games/LiveGames'


function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1c1208_0%,_#0d0d0d_45%,_#000000_100%)]">
      <Header />
      <div className="px-0 sm:px-3 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Navigate to="/" replace />} />
          <Route path="/podium" element={<Podium />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/live" element={<LiveGames />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
