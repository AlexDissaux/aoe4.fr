import { useLastChance } from '../hook/useLastChance';
import { useState } from 'react';

export default function LastChancePopup() {
    const { teams, loading } = useLastChance();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    if (loading || !teams || teams.length === 0) {
        return null;
    }

    return (
        <div 
            className="fixed top-4 right-4 z-50"
        >
            {/* Section déployable - placée en premier pour être derrière */}
            <div 
                className={`absolute top-0 right-0 transition-all duration-500 ease-out ${
                    isExpanded 
                        ? 'opacity-100 translate-x-0 pointer-events-auto' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="w-96 sm:w-[28rem] mt-20">
                    <div className="bg-gradient-to-br from-orange-900/95 via-red-900/95 to-purple-900/95 backdrop-blur-md border-2 border-orange-500/50 rounded-lg shadow-2xl shadow-orange-500/20 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 px-4 py-3 border-b border-orange-500/50">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">⚡</div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-wider">
                                        Last Chance Challenge
                                    </h3>
                                    <p className="text-xs text-orange-200">21-23 Novembre 2025 • Dernière ligne droite !</p>
                                </div>
                            </div>
                        </div>

                        {/* Explication des paliers */}
                        <div className="bg-black/40 px-4 py-2 border-b border-orange-500/30">
                            <div className="flex justify-around text-center text-xs">
                                <div>
                                    <div className="font-bold text-orange-400">50 games</div>
                                    <div className="text-white">1 pt (+1🥇)</div>
                                </div>
                                <div className="text-orange-500">•</div>
                                <div>
                                    <div className="font-bold text-orange-400">100 games</div>
                                    <div className="text-white">2 pts (+1🥇)</div>
                                </div>
                                <div className="text-orange-500">•</div>
                                <div>
                                    <div className="font-bold text-orange-400">150 games</div>
                                    <div className="text-white">3 pts (+1🥇)</div>
                                </div>
                            </div>
                        </div>

                        {/* Liste des équipes */}
                        <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                            {teams.map((team, index) => {
                                const rankColors = [
                                    'from-yellow-500/20 to-yellow-600/10 border-yellow-500/50',
                                    'from-gray-400/20 to-gray-500/10 border-gray-400/50',
                                    'from-orange-600/20 to-orange-700/10 border-orange-500/50',
                                    'from-purple-500/20 to-purple-600/10 border-purple-500/40'
                                ];
                                const rankEmojis = ['🥇', '🥈', '🥉', ''];
                                
                                const color = index < 3 ? rankColors[index] : rankColors[3];
                                const emoji = index < 3 ? rankEmojis[index] : '';
                                
                                return (
                                    <div 
                                        key={team.acronyme}
                                        className={`bg-gradient-to-r ${color} border rounded-lg p-3 hover:scale-105 transition-transform duration-200`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {/* Rang + Équipe */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="text-2xl w-8 text-center">
                                                    {emoji || `#${index + 1}`}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-sm">
                                                        {team.name}
                                                    </div>
                                                    <div className="text-xs text-gray-300">
                                                        {team.acronyme}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="text-right">
                                                <div className="text-xl font-black text-orange-400">
                                                    {team.points} pts
                                                </div>
                                                <div className="text-xs text-cyan-400 font-bold">
                                                    {team.totalGames} games
                                                </div>
                                            </div>
                                        </div>

                                        {/* Paliers atteints */}
                                        {team.totalGames >= 50 && (
                                            <div className="mt-2 flex gap-2 flex-wrap">
                                                {team.milestones.milestone50 && (
                                                    <span className={`text-xs px-2 py-0.5 rounded ${team.milestones.firstAt50 ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' : 'bg-green-500/20 text-green-300'}`}>
                                                        ✓ 50 {team.milestones.firstAt50 ? '👑' : ''}
                                                    </span>
                                                )}
                                                {team.milestones.milestone100 && (
                                                    <span className={`text-xs px-2 py-0.5 rounded ${team.milestones.firstAt100 ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' : 'bg-blue-500/20 text-blue-300'}`}>
                                                        ✓ 100 {team.milestones.firstAt100 ? '👑' : ''}
                                                    </span>
                                                )}
                                                {team.milestones.milestone150 && (
                                                    <span className={`text-xs px-2 py-0.5 rounded ${team.milestones.firstAt150 ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' : 'bg-purple-500/20 text-purple-300'}`}>
                                                        ✓ 150 {team.milestones.firstAt150 ? '👑' : ''}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="bg-black/40 px-4 py-2 border-t border-orange-500/30">
                            <p className="text-xs text-gray-400 text-center">
                                🔥 3 jours pour tout donner ! 🔥
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badge flottant permanent - placé en dernier pour être au-dessus */}
            <div 
                className={`relative z-10 transition-all duration-300 ${isExpanded ? 'scale-110' : 'scale-100 animate-pulse-slow'}`}
                onClick={toggleExpanded}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="bg-gradient-to-br from-orange-600 via-red-600 to-purple-900 border-2 border-orange-500/70 rounded-full px-4 py-3 flex items-center justify-center shadow-2xl shadow-orange-500/30 cursor-pointer relative">
                    <div className="text-center">
                        <div className="text-base font-black text-white whitespace-nowrap">Last Chance</div>
                    </div>
                    {/* Badge pulsant "NOUVEAU" */}
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border border-white animate-pulse">
                        NEW
                    </div>
                </div>
            </div>

            {/* Style pour l'animation pulse personnalisée */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
                    }
                    50% { 
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
