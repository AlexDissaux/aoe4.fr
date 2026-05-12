import './App.css'
import { Titre } from './components/Titre'
import Stat from './components/Stat/Stat'
// import BelgianLeaderboard from './components/BelgianLeaderboard'
import LastChancePopup from './components/LastChancePopup'
import Countdown from './components/Countdown'


function App() {

  return (
    <div className="min-h-screen bg-black">
      <div className="banner-container">
        <img src="Banniere_ODW.jpg" alt="Bannière ODW" className="banner-image" />
      </div>
      <div className="px-0 sm:px-3 py-8">
        <div className="w-full space-y-8">
          <Titre />
          <Countdown />
          <Stat/>
        </div>
        {/* <BelgianLeaderboard /> */}
        <LastChancePopup />
      </div>
        <div className="banner-container-footer">
        <img src="Banniere_ODW.jpg" alt="Bannière ODW" className="banner-image-footer" />
      </div>
    </div>
  )
}

export default App
