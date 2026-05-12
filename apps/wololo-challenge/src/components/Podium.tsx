import { useTeams } from '../hook/useTeams';

export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return <div className="bg-gray-900/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center pb-4">Podium</h2>
            <div className="text-white text-center">Loading podium...</div>
        </div>;
    }

    return (
    <div className="max-w-5xl mx-auto">

        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    🏆 Podium
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"></div>
            </div>
            
            {/* En-têtes du tableau - Desktop uniquement */}
            <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-gray-700/50 mb-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="w-10 text-center text-xs text-gray-500 uppercase font-bold">#</div>
                    <div className="flex-1 text-xs text-gray-500 uppercase font-bold">Équipe</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-center w-[60px] text-xs text-yellow-400 uppercase font-bold">Winrate</div>
                    <div className="text-center w-[50px] text-xs text-blue-400 uppercase font-bold">Games</div>
                    <div className="text-center w-[60px] text-xs text-cyan-400 uppercase font-bold">MMR</div>
                    <div className="text-center w-[45px] text-xs text-amber-400 uppercase font-bold">Civs</div>
                    <div className="text-center w-[45px] text-xs text-green-400 uppercase font-bold">Défis</div>
                    <div className="text-center w-[50px] text-xs text-orange-400 uppercase font-bold">Last C.</div>
                </div>
                <div className="w-px h-6 bg-gray-600 mx-2"></div>
                <div className="text-center w-[67px] text-xs text-purple-400 uppercase font-bold">Total</div>
            </div>
            
            <div className="space-y-2">
                {teams.map((team, index) => {
                    const captain = team.players.find((p: any) => p.isCap);
                    
                    // Couleurs et styles par position
                    const positionStyles = index === 0 ? {
                        bgGradient: 'bg-gradient-to-r from-yellow-500/15 via-yellow-600/8 to-transparent',
                        textColor: 'text-yellow-300',
                        scoreColor: 'text-yellow-400',
                        medal: '🥇'
                    } : index === 1 ? {
                        bgGradient: 'bg-gradient-to-r from-gray-400/15 via-gray-500/8 to-transparent',
                        textColor: 'text-gray-200',
                        scoreColor: 'text-gray-300',
                        medal: '🥈'
                    } : index === 2 ? {
                        bgGradient: 'bg-gradient-to-r from-orange-500/15 via-orange-600/8 to-transparent',
                        textColor: 'text-orange-300',
                        scoreColor: 'text-orange-400',
                        medal: '🥉'
                    } : {
                        bgGradient: 'bg-gradient-to-r from-gray-700/10 to-transparent',
                        textColor: 'text-gray-300',
                        scoreColor: 'text-gray-400',
                        medal: `${index + 1}`
                    };
                    
                    return (
                    <div key={index} className={`${positionStyles.bgGradient} border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 hover:brightness-110 px-3 sm:px-4 py-2`}>
                        <div className="flex items-center gap-2">
                            {/* Position + Nom */}
                            <div className="flex items-center gap-2 sm:gap-3 w-full md:flex-1">
                                {/* Position */}
                                <div className={`flex-shrink-0 w-10 text-center ${index > 2 ? 'text-base sm:text-lg font-bold bg-gray-800/50 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-600/50 text-gray-300' : 'text-xl sm:text-2xl'}`}>
                                    {positionStyles.medal}
                                </div>
                                
                                {/* Nom de l'équipe + Capitaine */}
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
                            
                            {/* Disciplines inline + Score total */}
                            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                                {/* Winrate */}
                                <div className="text-center py-1 bg-yellow-900/20 border border-yellow-500/30 w-[60px]">
                                    <div className="text-yellow-400 font-bold text-sm">{team.teamWinrate.winRate}%</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.winrate || 0}pt</div>
                                </div>
                                
                                {/* Games */}
                                <div className="text-center py-1 bg-blue-900/20 border border-blue-500/30 w-[50px]">
                                    <div className="text-blue-400 font-bold text-sm">{team.totalGames}</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.games || 0}pt</div>
                                </div>
                                
                                {/* MMR */}
                                <div className={`text-center py-1 border w-[60px] ${team.bestMmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                    <div className={`font-bold text-sm ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                        {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange}
                                    </div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.mmr || 0}pt</div>
                                </div>
                                
                                {/* Civs */}
                                <div className="text-center py-1 bg-amber-900/20 border border-amber-500/30 w-[45px]">
                                    <div className="text-amber-400 font-bold text-sm">{team.totalCivDiversity}</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.civs || 0}pt</div>
                                </div>
                                
                                {/* Défis */}
                                <div className="text-center py-1 bg-green-900/20 border border-green-500/30 w-[45px]">
                                    <div className="text-green-400 font-bold text-sm">{team.challengePoints}</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.challenges || 0}pt</div>
                                </div>
                                
                                {/* Last Chance */}
                                <div className="text-center py-1 bg-orange-900/20 border border-orange-500/30 w-[50px]">
                                    <div className="text-orange-400 font-bold text-sm">{team.lastChancePoints || 0}</div>
                                    <div className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.lastChance || 0}pt</div>
                                </div>
                            </div>
                            
                            {/* Séparateur + Score Total */}
                            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                                <div className="w-px h-10 bg-gray-600"></div>
                                <div className={`font-black text-2xl ${positionStyles.scoreColor} w-[70px] text-center`}>
                                    {team.rankingPoints}
                                </div>
                            </div>
                        </div>
                        
                        {/* Disciplines en mobile */}
                        <div className="md:hidden mt-3">
                            {/* Disciplines en liste */}
                            <div className="space-y-1.5 text-xs">
                                {/* Winrate */}
                                <div className="bg-yellow-900/20 border border-yellow-500/30 px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-yellow-400 uppercase font-bold text-[11px]">Winrate</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400 font-bold text-sm">{team.teamWinrate.winRate}%</span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.winrate || 0}pt</span>
                                    </div>
                                </div>
                                
                                {/* Games */}
                                <div className="bg-blue-900/20 border border-blue-500/30 px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-blue-400 uppercase font-bold text-[11px]">Games</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-400 font-bold text-sm">{team.totalGames}</span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.games || 0}pt</span>
                                    </div>
                                </div>
                                
                                {/* MMR */}
                                <div className={`border px-3 py-1.5 rounded flex items-center justify-between ${team.bestMmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                    <span className={`uppercase font-bold text-[11px] ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>MMR</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold text-sm ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                            {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange}
                                        </span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.mmr || 0}pt</span>
                                    </div>
                                </div>
                                
                                {/* Civs */}
                                <div className="bg-amber-900/20 border border-amber-500/30 px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-amber-400 uppercase font-bold text-[11px]">Civs</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold text-sm">{team.totalCivDiversity}</span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.civs || 0}pt</span>
                                    </div>
                                </div>
                                
                                {/* Défis */}
                                <div className="bg-green-900/20 border border-green-500/30 px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-green-400 uppercase font-bold text-[11px]">Défis</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400 font-bold text-sm">{team.challengePoints}</span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.challenges || 0}pt</span>
                                    </div>
                                </div>
                                
                                {/* Last Chance */}
                                <div className="bg-orange-900/20 border border-orange-500/30 px-3 py-1.5 rounded flex items-center justify-between">
                                    <span className="text-orange-400 uppercase font-bold text-[11px]">Last Chance</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-orange-400 font-bold text-sm">{team.lastChancePoints || 0}</span>
                                        <span className="text-purple-400 font-bold text-xs">{team.pointsByDiscipline?.lastChance || 0}pt</span>
                                    </div>
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
