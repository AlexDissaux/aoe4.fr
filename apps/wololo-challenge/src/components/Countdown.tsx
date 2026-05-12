import { useState, useEffect } from 'react';
import { endDate } from '../db/data';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = new Date(endDate).getTime() - new Date().getTime();
        
        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isFinished: true
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isFinished: false
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (timeLeft.isFinished) {
        return (
            <div className="max-w-5xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm border-2 border-gray-500/50 p-6 shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 mb-2">
                            🏁 CHALLENGE TERMINÉ ! 🏁
                        </h2>
                        <p className="text-gray-400 text-lg">Bravo à tous les participants !</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 p-4 sm:p-6 shadow-2xl">
                <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-300 mb-1 flex items-center justify-center gap-2">
                        <span className="text-2xl">⏱️</span>
                        <span>Temps restant</span>
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm">Fin du challenge • 23 Nov. 2025 à 22h00</p>
                </div>
                
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {/* Jours */}
                    <div className="bg-gray-800/60 border border-gray-600/40 rounded-lg p-3 sm:p-4 hover:border-gray-500/60 transition-colors">
                        <div className="text-3xl sm:text-5xl font-black text-white mb-1">
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase font-bold">Jours</div>
                    </div>
                    
                    {/* Heures */}
                    <div className="bg-gray-800/60 border border-gray-600/40 rounded-lg p-3 sm:p-4 hover:border-gray-500/60 transition-colors">
                        <div className="text-3xl sm:text-5xl font-black text-white mb-1">
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase font-bold">Heures</div>
                    </div>
                    
                    {/* Minutes */}
                    <div className="bg-gray-800/60 border border-gray-600/40 rounded-lg p-3 sm:p-4 hover:border-gray-500/60 transition-colors">
                        <div className="text-3xl sm:text-5xl font-black text-white mb-1">
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase font-bold">Minutes</div>
                    </div>
                    
                    {/* Secondes */}
                    <div className="bg-gray-800/60 border border-yellow-500/30 rounded-lg p-3 sm:p-4 hover:border-yellow-500/50 transition-colors">
                        <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1">
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase font-bold">Secondes</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
