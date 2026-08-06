import { useState, useEffect } from 'react';

const EVENT_DATE = '2026-09-04T19:00:00';

function calculateTimeLeft() {
    const difference = new Date(EVENT_DATE).getTime() - new Date().getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: false,
    };
}

const UNITS = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' },
] as const;

export default function CompteARebours() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20">
            <img
                src="/wololo-challenge-logo.png"
                alt="Wololo Challenge"
                className="w-40 h-40 sm:w-56 sm:h-56 mb-6 drop-shadow-[0_0_35px_rgba(251,191,36,0.35)] animate-pulse-subtle"
            />

            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-yellow-400 to-orange-500"></div>
                <div className="w-3 h-3 bg-yellow-400 rotate-45 animate-spin-slow"></div>
                <div className="h-1 w-16 sm:w-24 bg-gradient-to-l from-transparent via-orange-500 to-red-500"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 tracking-tight drop-shadow-2xl mb-4 animate-pulse-subtle">
                The Wololo Challenge is coming!
            </h1>
            <p className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm mb-10">
                See you on September 4th, 2026 at 7:00 PM
            </p>

            {timeLeft.isFinished ? (
                <p className="text-3xl sm:text-4xl font-black text-amber-300">Let's go!</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
                    {UNITS.map(unit => (
                        <div
                            key={unit.key}
                            className="bg-gray-900/80 backdrop-blur-sm border border-amber-300/20 rounded-xl p-4 sm:p-6 shadow-2xl hover:border-amber-300/50 transition-colors"
                        >
                            <div className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-orange-400 to-red-500 mb-2">
                                {String(timeLeft[unit.key]).padStart(2, '0')}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 uppercase font-bold tracking-widest">
                                {unit.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
