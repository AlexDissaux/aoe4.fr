import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './components/Home'
import Podium from './components/podium/Podium'
import Leaderboard from './components/Leaderboard'
import Rules from './components/Rules'


function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="px-0 sm:px-3 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podium" element={<Podium />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
