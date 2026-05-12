import { useBelgianLeaderboard } from '../hook/useBelgianLeaderboard';
import { useState } from 'react';

export default function BelgianLeaderboard() {
    const { players, loading } = useBelgianLeaderboard();
    const [isExpanded, setIsExpanded] = useState(false);

    if (loading || !players || players.length === 0) {
        return null;
    }

    return (
        <div 
            className="fixed top-4 right-4 z-50"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Drapeau flottant permanent */}
            <div className={`transition-all duration-300 ${isExpanded ? 'scale-110' : 'scale-100 animate-bounce-slow'}`}>
                <div className="bg-gradient-to-br from-red-600 via-yellow-500 to-black border-2 border-yellow-500/70 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl shadow-yellow-500/30 cursor-pointer">
                    <div className="flex h-8 w-12 overflow-hidden rounded-sm">
                        <div className="w-1/3 bg-black"></div>
                        <div className="w-1/3 bg-yellow-400"></div>
                        <div className="w-1/3 bg-red-600"></div>
                    </div>
                </div>
            </div>

            {/* Section déployable */}
            <div className={`absolute top-0 right-0 transition-all duration-500 ease-out ${
                isExpanded 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : 'opacity-0 translate-x-8 pointer-events-none'
            }`}>
                <div className="w-80 sm:w-96 mt-20">
                    <div className="bg-gradient-to-br from-red-900/95 via-yellow-900/95 to-black/95 backdrop-blur-md border-2 border-yellow-500/50 rounded-lg shadow-2xl shadow-yellow-500/20 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-black via-yellow-500/30 to-red-600/30 px-4 py-3 border-b border-yellow-500/50">
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-8 overflow-hidden rounded-sm">
                                    <div className="w-1/3 bg-black"></div>
                                    <div className="w-1/3 bg-yellow-400"></div>
                                    <div className="w-1/3 bg-red-600"></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider">
                                        TOP 3 Belgique
                                    </h3>
                                    <p className="text-xs text-gray-400">Classement Solo 1V1</p>
                                </div>
                            </div>
                        </div>

                        {/* Liste des joueurs */}
                        <div className="p-3 space-y-2">
                            {players.map((player, index) => {
                                const medalEmojis = ['🥇', '🥈', '🥉'];
                                const medalColors = [
                                    'from-yellow-500/20 to-yellow-600/10 border-yellow-500/50',
                                    'from-gray-400/20 to-gray-500/10 border-gray-400/50',
                                    'from-orange-500/20 to-orange-600/10 border-orange-500/50'
                                ];
                                
                                return (
                                    <div 
                                        key={player.profile_id}
                                        className={`bg-gradient-to-r ${medalColors[index]} border rounded-lg p-3 hover:scale-105 transition-transform duration-200`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Médaille + Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <img 
                                                    src={player.avatars.medium} 
                                                    alt={player.name}
                                                    className="w-12 h-12 rounded-full border-2 border-yellow-500/50"
                                                />
                                                <span className="absolute -top-2 -right-2 text-2xl">
                                                    {medalEmojis[index]}
                                                </span>
                                            </div>

                                            {/* Infos joueur */}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-white truncate text-sm">
                                                    {player.name.replace('[ODW] ', '').replace('[ODW]', '')}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-yellow-400 font-bold">#{player.rank}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-cyan-400 font-bold">{player.rating} MMR</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs mt-1">
                                                    <span className="text-green-400">{player.wins_count}W</span>
                                                    <span className="text-red-400">{player.losses_count}L</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-yellow-300">{player.win_rate.toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="bg-black/40 px-4 py-2 border-t border-yellow-500/30">
                            <p className="text-xs text-gray-400 text-center">
                                Qui sera le prochain Top 1 Belge ?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Style pour l'animation bounce personnalisée */}
            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
