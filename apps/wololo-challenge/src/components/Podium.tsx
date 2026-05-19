import { useTeams } from '../hook/useTeams';

const TEAM_COLORS: Record<string, { border: string; text: string }> = {
    'ODW':         { border: 'border-orange-500', text: 'text-orange-300'  },
    'Lash':        { border: 'border-slate-400',  text: 'text-slate-200'   },
    'aoeItalia':   { border: 'border-green-500',  text: 'text-green-300'   },
    'cup of tea':  { border: 'border-cyan-500',   text: 'text-cyan-300'    },
    'Shing Shong': { border: 'border-purple-500', text: 'text-purple-300'  },
};

export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return (
            <div className="bg-gray-900/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center pb-4">Podium</h2>
                <div className="text-white text-center">Loading podium...</div>
            </div>
        );
    }

    return (
    <div className="max-w-5xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    🏆 Podium
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500" />
            </div>

            {/* En-têtes desktop */}
            <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-gray-700/50 mb-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="w-10" />
                    <div className="flex-1 text-xs text-gray-500 uppercase font-bold">Équipe</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-center w-[70px] text-xs text-yellow-400 uppercase font-bold">Winrate</div>
                    <div className="text-center w-[60px] text-xs text-blue-400 uppercase font-bold">Games</div>
                    <div className="text-center w-[60px] text-xs text-amber-400 uppercase font-bold">Civs ✓</div>
                </div>
                <div className="w-px h-6 bg-gray-600 mx-2" />
                <div className="text-center w-[67px] text-xs text-purple-400 uppercase font-bold">Total</div>
            </div>

            <div className="space-y-2">
                {teams.map((team, index) => {
                    const captain = team.players.find((p: any) => p.isCap);
                    const teamColor = TEAM_COLORS[team.name] ?? { border: 'border-gray-500', text: 'text-gray-300' };

                    const positionStyles = index === 0 ? {
                        bgGradient: 'bg-gradient-to-r from-yellow-500/15 via-yellow-600/8 to-transparent',
                        textColor: teamColor.text,
                        scoreColor: 'text-yellow-400',
                        medal: '🥇'
                    } : index === 1 ? {
                        bgGradient: 'bg-gradient-to-r from-gray-400/15 via-gray-500/8 to-transparent',
                        textColor: teamColor.text,
                        scoreColor: 'text-gray-300',
                        medal: '🥈',
                    } : index === 2 ? {
                        bgGradient: 'bg-gradient-to-r from-orange-500/15 via-orange-600/8 to-transparent',
                        textColor: teamColor.text,
                        scoreColor: 'text-orange-400',
                        medal: '🥉',
                    } : {
                        bgGradient: 'bg-gradient-to-r from-gray-700/10 to-transparent',
                        textColor: teamColor.text,
                        scoreColor: 'text-gray-400',
                        medal: `${index + 1}`,
                    };

                    return (
                    <div key={team.name} className={`${positionStyles.bgGradient} border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 hover:brightness-110 px-3 sm:px-4 py-2`}>
                        <div className="flex items-center gap-2">
                            {/* Position + Nom */}
                            <div className="flex items-center gap-2 sm:gap-3 w-full md:flex-1">
                                <div className={`flex-shrink-0 text-center ${index > 2 ? 'text-base sm:text-lg font-bold bg-gray-800/50 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-600/50 text-gray-300' : 'text-xl sm:text-2xl w-10'}`}>
                                    {positionStyles.medal}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className={`font-bold text-base sm:text-lg truncate ${positionStyles.textColor}`}>
                                        {team.name}
                                    </div>
                                    {captain && (
                                        <div className="text-xs text-gray-500 truncate">
                                            <span className="text-yellow-400">👑</span> {captain.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Score mobile */}
                            <div className="md:hidden flex-shrink-0 text-right">
                                <div className={`font-black text-2xl ${positionStyles.scoreColor}`}>
                                    {team.rankingPoints}
                                </div>
                                <div className="text-[10px] text-gray-500 uppercase">pts</div>
                            </div>
                            
                            {/* Disciplines desktop */}
                            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                                <div className="text-center py-1 bg-yellow-900/20 border border-yellow-500/30 w-[70px]">
                                    <div className="text-yellow-400 font-bold text-sm">{team.teamWinrate.winRate}%</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.winrate}pt</div>
                                </div>
                                <div className="text-center py-1 bg-blue-900/20 border border-blue-500/30 w-[60px]">
                                    <div className="text-blue-400 font-bold text-sm">{team.totalGames}</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.games}pt</div>
                                </div>
                                <div className="text-center py-1 bg-amber-900/20 border border-amber-500/30 w-[60px]">
                                    <div className="text-amber-400 font-bold text-sm">{team.totalCivsWon}<span className="text-gray-500 text-xs">/23</span></div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.civs}pt</div>
                                </div>
                            </div>

                            {/* Séparateur + Score Total */}
                            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                                <div className="w-px h-10 bg-gray-600" />
                                <div className={`font-black text-2xl ${positionStyles.scoreColor} w-[70px] text-center`}>
                                    {team.rankingPoints}
                                </div>
                            </div>
                        </div>

                        {/* Disciplines mobile */}
                        <div className="md:hidden mt-3 space-y-1.5 text-xs">
                            <div className="bg-yellow-900/20 border border-yellow-500/30 px-3 py-1.5 flex items-center justify-between">
                                <span className="text-yellow-400 uppercase font-bold text-[11px]">Winrate</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 font-bold text-sm">{team.teamWinrate.winRate}%</span>
                                    <span className="text-gray-500 text-xs">({team.teamWinrate.win}V/{team.teamWinrate.lose}D)</span>
                                    <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.winrate}pt</span>
                                </div>
                            </div>
                            <div className="bg-blue-900/20 border border-blue-500/30 px-3 py-1.5 flex items-center justify-between">
                                <span className="text-blue-400 uppercase font-bold text-[11px]">Games</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-bold text-sm">{team.totalGames}</span>
                                    <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.games}pt</span>
                                </div>
                            </div>
                            <div className="bg-amber-900/20 border border-amber-500/30 px-3 py-1.5 flex items-center justify-between">
                                <span className="text-amber-400 uppercase font-bold text-[11px]">Civs gagnées</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-400 font-bold text-sm">{team.totalCivsWon}<span className="text-gray-500">/23</span></span>
                                    <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline.civs}pt</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}
