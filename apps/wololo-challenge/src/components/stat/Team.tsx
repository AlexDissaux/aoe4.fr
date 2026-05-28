

import { useTeams } from '../../hook/useTeams';
import { useState } from 'react';

export default function Teams() {
    const { teams } = useTeams();
    const [openTooltipIndex, setOpenTooltipIndex] = useState<string | null>(null);

    if (!teams) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl font-medium">Loading teams...</div>
        </div>;
    }

    // for each team display a title
    // print the player[0].modes.rm_solo.rating for each player
    // return the html :
    return <div className="w-full space-y-6 px-2 sm:px-4">
        {/* Titre de la section Teams */}
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500 to-orange-500"></div>
                <h2 className="pb-2 text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    ⚔️ Équipes Détaillées
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-orange-500 to-orange-500"></div>
            </div>
        </div>

        {teams.map((team, teamIndex) => {
            // Définir une couleur par équipe
            const teamColor = teamIndex === 0 ? 'bg-orange-500' :
                            teamIndex === 1 ? 'bg-cyan-500' :
                            teamIndex === 2 ? 'bg-purple-500' :
                            teamIndex === 3 ? 'bg-pink-500' :
                            teamIndex === 4 ? 'bg-green-500' :
                            'bg-indigo-500';
            
            return (
                <div key={teamIndex} className="w-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900 transition-all duration-300 shadow-lg border border-gray-700/30 hover:border-gray-600/50">
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Titre de l'équipe à gauche (en haut sur mobile) */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center p-4 sm:p-6 lg:p-8 lg:border-r border-b lg:border-b-0 border-gray-700/50">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
                                {team.name}
                            </h2>
                            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mb-4"></div>
                            
                            {/* Score Total de l'équipe */}
                            <div className="space-y-4">
                                <div className="bg-purple-900/30 border-2 border-purple-500/50 px-4 py-3 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300 font-bold text-base sm:text-lg">🏆 SCORE TOTAL</span>
                                        <span className="text-purple-400 font-black text-2xl sm:text-3xl">{team.rankingPoints} pts</span>
                                    </div>
                                </div>
                                
                                {/* Détail des disciplines */}
                                <div className="space-y-2">
                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Disciplines :</div>
                                    
                                    <div className="bg-yellow-900/20 border border-yellow-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-yellow-400 text-sm font-medium">Winrate</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-yellow-400 font-bold text-lg">{team.teamWinrate.winRate}%</span>
                                                <span className="text-purple-400 font-bold text-sm bg-purple-900/40 px-2 py-0.5 border border-purple-500/30">
                                                    {team.pointsByDiscipline.winrate} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-blue-900/20 border border-blue-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-400 text-sm font-medium">Nombre de parties</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-blue-400 font-bold text-lg">{team.totalGames}</span>
                                                <span className="text-purple-400 font-bold text-sm bg-purple-900/40 px-2 py-0.5 border border-purple-500/30">
                                                    {team.pointsByDiscipline.games} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`border px-3 py-2 ${team.bestMmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm font-medium ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>Meilleur évolution MMR</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-lg ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                    {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange}
                                                </span>
                                                <span className="text-purple-400 font-bold text-sm bg-purple-900/40 px-2 py-0.5 border border-purple-500/30">
                                                    {team.pointsByDiscipline.mmr} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-amber-900/20 border border-amber-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-amber-400 text-sm font-medium">Diversité Civs</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-amber-400 font-bold text-lg">{team.totalCivDiversity}</span>
                                                <span className="text-purple-400 font-bold text-sm bg-purple-900/40 px-2 py-0.5 border border-purple-500/30">
                                                    {team.pointsByDiscipline.civs} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-900/20 border border-green-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-green-400 text-sm font-medium">Défis</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400 font-bold text-lg">{team.challengePoints}</span>
                                                <span className="text-purple-400 font-bold text-sm bg-purple-900/40 px-2 py-0.5 border border-purple-500/30">
                                                    {team.pointsByDiscipline.challenges} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Liste des joueurs à droite (en bas sur mobile) */}
                        <div className="w-full lg:w-2/3 py-2">
                            <div className="divide-y divide-gray-700/30">
                                {team.players.map((player: any, playerIndex: number) => (
                                    <div key={playerIndex} className={`px-3 sm:px-4 lg:px-6 py-2 hover:bg-gray-800/40 transition-colors duration-150 relative ${
                                        playerIndex % 2 === 0 ? 'bg-gradient-to-r from-gray-800/10 to-transparent' : 'bg-gradient-to-r from-gray-800/5 to-transparent'
                                    } ${player.isCap ? 'bg-gradient-to-r from-yellow-900/10 via-transparent to-transparent border-l-2 border-yellow-500/30' : ''}`}>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            {/* Nom du joueur à gauche */}
                                            <div className="flex items-center space-x-2 sm:w-48 lg:w-56 flex-shrink-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold text-sm sm:text-base lg:text-lg ${
                                                        player.isCap ? 'text-yellow-300' : 'text-white'
                                                    }`}>{player.name}</span>
                                                    {player.isCap && (
                                                        <span className="text-xs font-bold px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase tracking-wider hidden sm:inline">
                                                            Cap
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Statistiques à droite */}
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:grid sm:grid-cols-4 gap-1.5 text-xs">
                                                    {/* Winrate */}
                                                    <div className="bg-yellow-900/20 border border-yellow-500/30 px-2 sm:px-2 py-1.5 sm:text-center flex sm:block items-center justify-between sm:justify-center">
                                                        <span className="text-gray-400 text-xs uppercase sm:hidden">Winrate</span>
                                                        <div className="flex items-center gap-2 sm:block">
                                                            <div className="flex gap-1 sm:hidden">
                                                                <span className="text-green-400 text-xs">{player.modes.rm_solo.wins_count}W</span>
                                                                <span className="text-red-400 text-xs">{player.modes.rm_solo.losses_count}L</span>
                                                            </div>
                                                            <span className="text-yellow-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.win_rate}%</span>
                                                        </div>
                                                        <div className="text-gray-400 text-xs uppercase hidden sm:block">Winrate</div>
                                                        <div className="hidden sm:flex justify-center gap-1 mt-0.5">
                                                            <span className="text-green-400 text-xs">{player.modes.rm_solo.wins_count}W</span>
                                                            <span className="text-red-400 text-xs">{player.modes.rm_solo.losses_count}L</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Parties jouées */}
                                                    <div className="bg-blue-900/20 border border-blue-500/30 px-2 sm:px-2 py-1.5 sm:text-center flex sm:block items-center justify-between sm:justify-center">
                                                        <span className="text-gray-400 text-xs uppercase sm:hidden">Games</span>
                                                        <span className="text-blue-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count}</span>
                                                        <div className="text-gray-400 text-xs uppercase hidden sm:block">Games</div>
                                                    </div>
                                                    
                                                    {/* MMR Change */}
                                                    <div className={`border px-2 sm:px-2 py-1.5 sm:text-center flex sm:block items-center justify-between sm:justify-center ${player.modes.rm_solo.mmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                                        <span className={`text-xs uppercase sm:hidden ${player.modes.rm_solo.mmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>MMR</span>
                                                        <div className="flex items-center gap-1.5 sm:block">
                                                            <span className="text-gray-500 text-xs sm:hidden">
                                                                {player.modes.rm_solo.mmrBeg} → {player.modes.rm_solo.mmrEnd}
                                                            </span>
                                                            <span className={`font-bold text-sm sm:text-base ${player.modes.rm_solo.mmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                                {player.modes.rm_solo.mmrChange >= 0 ? '+' : ''}{player.modes.rm_solo.mmrChange}
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-400 text-xs uppercase hidden sm:block">MMR</div>
                                                        <div className="hidden sm:block text-gray-500 text-xs mt-0.5">
                                                            {player.modes.rm_solo.mmrBeg} → {player.modes.rm_solo.mmrEnd}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Civilisations */}
                                                    <div 
                                                        className="bg-amber-900/20 border border-amber-500/30 px-2 sm:px-2 py-1.5 sm:text-center flex sm:block items-center justify-between sm:justify-center relative group cursor-pointer"
                                                        onClick={() => {
                                                            const tooltipKey = `${teamIndex}-${playerIndex}`;
                                                            setOpenTooltipIndex(openTooltipIndex === tooltipKey ? null : tooltipKey);
                                                        }}
                                                    >
                                                        <span className="text-gray-400 text-xs uppercase sm:hidden">Civs</span>
                                                        <span className="text-amber-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.nombreCivDiffJouer}</span>
                                                        <div className="text-gray-400 text-xs uppercase hidden sm:block">Civs</div>
                                                        
                                                        {/* Tooltip */}
                                                        {player.modes.rm_solo.civilizations && player.modes.rm_solo.civilizations.length > 0 && (
                                                            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-48 ${openTooltipIndex === `${teamIndex}-${playerIndex}` ? 'block' : 'hidden'} lg:hidden lg:group-hover:block`}>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
} 