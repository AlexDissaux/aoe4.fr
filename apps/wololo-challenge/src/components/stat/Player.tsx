import { usePlayers } from "../../hook/usePlayers";
import { useState } from "react";

type SortKey = 'winrate' | 'games' | 'mmr' | 'civs';

export default function Player() {
    const { players } = usePlayers()
    const [sortBy, setSortBy] = useState<SortKey>('winrate');
    const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

    if (!players) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl font-medium">Loading players...</div>
        </div>;
    }

    // Fonction de tri
    const sortedPlayers = [...players].sort((a, b) => {
        switch (sortBy) {
            case 'winrate':
                return parseFloat(b.modes.rm_solo.win_rate) - parseFloat(a.modes.rm_solo.win_rate);
            case 'games':
                return (b.modes.rm_solo.wins_count + b.modes.rm_solo.losses_count) - 
                       (a.modes.rm_solo.wins_count + a.modes.rm_solo.losses_count);
            case 'mmr':
                return b.modes.rm_solo.mmrChange - a.modes.rm_solo.mmrChange;
            case 'civs':
                return b.modes.rm_solo.nombreCivDiffJouer - a.modes.rm_solo.nombreCivDiffJouer;
            default:
                return 0;
        }
    });

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    👥 Joueurs
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500 to-blue-500"></div>
            </div>
            
            {/* Boutons de tri - Tous écrans */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 justify-center">
                <button
                    onClick={() => setSortBy('winrate')}
                    className={`px-4 py-2 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        sortBy === 'winrate' 
                            ? 'bg-yellow-500/30 text-yellow-400 border-2 border-yellow-500 shadow-lg shadow-yellow-500/20' 
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:border-yellow-500/50'
                    }`}
                >
                    📊 Winrate
                </button>
                <button
                    onClick={() => setSortBy('games')}
                    className={`px-4 py-2 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        sortBy === 'games' 
                            ? 'bg-blue-500/30 text-blue-400 border-2 border-blue-500 shadow-lg shadow-blue-500/20' 
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:border-blue-500/50'
                    }`}
                >
                    🎮 Games
                </button>
                <button
                    onClick={() => setSortBy('mmr')}
                    className={`px-4 py-2 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        sortBy === 'mmr' 
                            ? 'bg-cyan-500/30 text-cyan-400 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20' 
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:border-cyan-500/50'
                    }`}
                >
                    📈 MMR
                </button>
                <button
                    onClick={() => setSortBy('civs')}
                    className={`px-4 py-2 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        sortBy === 'civs' 
                            ? 'bg-amber-500/30 text-amber-400 border-2 border-amber-500 shadow-lg shadow-amber-500/20' 
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:border-amber-500/50'
                    }`}
                >
                    🏛️ Civs
                </button>
            </div>
            
            {/* En-têtes du tableau - Visible uniquement sur desktop */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700/50 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                <div className="col-span-1">#</div>
                <div className="col-span-2">Joueur</div>
                <div className="col-span-2">Équipe</div>
                <button
                    onClick={() => setSortBy('winrate')}
                    className={`col-span-1 text-center hover:text-yellow-400 transition-colors ${sortBy === 'winrate' ? 'text-yellow-400' : ''}`}
                >
                    Win Rate {sortBy === 'winrate' && '▼'}
                </button>
                <button
                    onClick={() => setSortBy('games')}
                    className={`col-span-1 text-center hover:text-blue-400 transition-colors ${sortBy === 'games' ? 'text-blue-400' : ''}`}
                >
                    Games {sortBy === 'games' && '▼'}
                </button>
                <div className="col-span-2 text-center">Victoires / Défaites</div>
                <button
                    onClick={() => setSortBy('mmr')}
                    className={`col-span-2 text-center hover:text-cyan-400 transition-colors ${sortBy === 'mmr' ? 'text-cyan-400' : ''}`}
                >
                    MMR {sortBy === 'mmr' && '▼'}
                </button>
                <button
                    onClick={() => setSortBy('civs')}
                    className={`col-span-1 text-center hover:text-amber-400 transition-colors ${sortBy === 'civs' ? 'text-amber-400' : ''}`}
                >
                    Civs {sortBy === 'civs' && '▼'}
                </button>
            </div>
            
            <div className="divide-y divide-gray-700/20">
                {sortedPlayers.map((player, index) => {
                    // Couleurs en fonction du classement
                    const rankColor = 'text-gray-500';
                    
                    // Couleur de fond par équipe
                    const teamColors: Record<string, string> = {
                        'Team du turfu': 'from-orange-500/10',
                        'Team du tard l\'époque': 'from-cyan-500/10',
                        'Team du moment présent': 'from-purple-500/10',
                        'Team Alpha': 'from-pink-500/10',
                        'Team Bravo': 'from-green-500/10',
                        'Team Charlie': 'from-indigo-500/10',
                    };
                    
                    const teamBgGradient = teamColors[player.teamName] || 'from-gray-600/10';
                    
                    // Si c'est un capitaine, on renforce la couleur de l'équipe
                    const nameBgGradient = player.isCap 
                        ? teamBgGradient.replace('/10', '/20')
                        : teamBgGradient;
                    
                    return (
                        <div key={index} className={`px-3 sm:px-4 py-2 hover:bg-gray-800/40 transition-colors duration-150 ${
                            index % 2 === 0 ? 'bg-gray-800/5' : 'bg-transparent'
                        } ${player.isCap ? 'border-l-2 border-yellow-500/30' : ''}`}>
                            {/* Layout Mobile/Tablette */}
                            <div className="lg:hidden">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                                        <span className={`${rankColor} font-bold text-sm sm:text-base flex-shrink-0 w-6`}>{index + 1}</span>
                                                                                
                                        {player.isCap && (
                                            <span className="text-yellow-400 text-base sm:text-lg flex-shrink-0 animate-pulse-subtle">👑</span>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className={`font-bold text-sm sm:text-base truncate ${
                                                player.isCap ? 'text-yellow-300' : 'text-white'
                                            }`}>{player.name}</div>
                                            <div className="text-xs text-blue-400 truncate">{player.teamName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs ml-8">
                                    <div className="bg-yellow-900/20 border border-yellow-500/30 px-2 py-1 text-center">
                                        <div className="text-yellow-400 font-bold text-sm">{player.modes.rm_solo.win_rate}%</div>
                                        <div className="text-gray-400 text-xs">WR</div>
                                    </div>
                                    <div className="bg-blue-900/20 border border-blue-500/30 px-2 py-1 text-center">
                                        <div className="text-blue-400 font-bold text-sm">{player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count}</div>
                                        <div className="text-gray-400 text-xs">Games</div>
                                    </div>
                                    <div className={`border px-2 py-1 text-center ${player.modes.rm_solo.mmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                        <div className={`font-bold text-sm ${player.modes.rm_solo.mmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                            {player.modes.rm_solo.mmrChange >= 0 ? '+' : ''}{player.modes.rm_solo.mmrChange}
                                        </div>
                                        <div className="text-gray-400 text-xs">MMR</div>
                                    </div>
                                    <div 
                                        className="bg-amber-900/20 border border-amber-500/30 px-2 py-1 text-center relative group cursor-pointer"
                                        onClick={() => setOpenTooltipIndex(openTooltipIndex === index ? null : index)}
                                    >
                                        <div className="text-amber-400 font-bold text-sm">{player.modes.rm_solo.nombreCivDiffJouer}</div>
                                        <div className="text-gray-400 text-xs">Civs</div>
                                        
                                        {/* Tooltip */}
                                        {player.modes.rm_solo.civilizations && player.modes.rm_solo.civilizations.length > 0 && (
                                            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-48 ${openTooltipIndex === index ? 'block' : 'hidden'} lg:hidden lg:group-hover:block`}>
                                                <div className="bg-gray-900 border-2 border-amber-500/50 rounded-lg shadow-xl p-3">
                                                    <div className="text-amber-400 font-bold text-xs uppercase mb-2 text-center">Civilisations jouées</div>
                                                    <div className="space-y-1 max-h-64 overflow-y-auto">
                                                        {player.modes.rm_solo.civilizations.map((civ: string, idx: number) => (
                                                            <div key={idx} className="text-gray-300 text-xs py-0.5 px-2 bg-gray-800/50 rounded">
                                                                {civ}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Flèche du tooltip */}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                                    <div className="border-8 border-transparent border-t-amber-500/50"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Layout Desktop */}
                            <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                    <span className={`${rankColor} font-bold text-lg`}>{index + 1}</span>
                                </div>
                                <div className={`col-span-2 bg-gradient-to-r ${nameBgGradient} to-transparent py-1 px-2 -mx-2 flex items-center gap-2`}>                                    
                                    {player.isCap && (
                                        <span className="text-yellow-400 text-lg flex-shrink-0">👑</span>
                                    )}
                                    <span className={`font-bold text-base tracking-wide truncate ${
                                        player.isCap ? 'text-yellow-300' : 'text-white'
                                    }`}>{player.name}</span>
                                    {player.isCap && (
                                        <span className="text-xs font-bold px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase tracking-wider">
                                            Cap
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <div className="text-blue-400 font-medium text-sm truncate">{player.teamName}</div>
                                    <div className="text-xs text-gray-500">{player.acronyme}</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <span className="text-yellow-400 font-bold text-lg">{player.modes.rm_solo.win_rate}%</span>
                                </div>
                                <div className="col-span-1 text-center">
                                    <span className="text-blue-400 font-semibold">{player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count}</span>
                                </div>
                                <div className="col-span-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <span className="text-green-400 font-bold">{player.modes.rm_solo.wins_count}W</span>
                                        <span className="text-gray-500">/</span>
                                        <span className="text-red-400 font-bold">{player.modes.rm_solo.losses_count}L</span>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center">
                                    <div className={`font-bold text-base ${player.modes.rm_solo.mmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                        {player.modes.rm_solo.mmrChange >= 0 ? '+' : ''}{player.modes.rm_solo.mmrChange}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {player.modes.rm_solo.mmrBeg} → {player.modes.rm_solo.mmrEnd}
                                    </div>
                                </div>
                                <div className="col-span-1 text-center relative group">
                                    <span className="text-amber-400 font-bold text-base">{player.modes.rm_solo.nombreCivDiffJouer}</span>
                                    
                                    {/* Tooltip */}
                                    {player.modes.rm_solo.civilizations && player.modes.rm_solo.civilizations.length > 0 && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-48">
                                            <div className="bg-gray-900 border-2 border-amber-500/50 rounded-lg shadow-xl p-3">
                                                <div className="text-amber-400 font-bold text-xs uppercase mb-2 text-center">Civilisations jouées</div>
                                                <div className="space-y-1 max-h-64 overflow-y-auto">
                                                    {player.modes.rm_solo.civilizations.map((civ: string, idx: number) => (
                                                        <div key={idx} className="text-gray-300 text-xs py-0.5 px-2 bg-gray-800/50 rounded">
                                                            {civ}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Flèche du tooltip */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                                <div className="border-8 border-transparent border-t-amber-500/50"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
} 