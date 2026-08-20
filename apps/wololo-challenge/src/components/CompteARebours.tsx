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
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (dismissed || timeLeft.isFinished) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-4xl">
                <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss"
                    className="absolute -top-2 -right-2 sm:top-0 sm:right-0 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 border border-amber-300/30 text-gray-300 hover:text-white hover:border-amber-300/60 transition-colors text-lg cursor-pointer"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20 bg-gray-950/90 border border-amber-300/20 rounded-2xl shadow-2xl">
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

                    <button
                        type="button"
                        onClick={() => setDismissed(true)}
                        className="btn-wave group mt-10 inline-flex items-center gap-2 px-8 py-3 border-amber-300/20 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                    >
                        Go to the preview
                        <svg
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
