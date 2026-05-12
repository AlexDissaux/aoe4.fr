import { useState, useMemo } from "react";
import { usePlayers } from "../hook/usePlayers";
import { teamsNameAndId } from "../db/data";

type SortKey = 'winrate' | 'games' | 'mmr' | 'civs';

// One color per team, ordered matching teamsNameAndId
const TEAM_COLORS: Record<string, { border: string; text: string; bg: string; activeBg: string }> = {
    'ODC': { border: 'border-orange-500',   text: 'text-orange-400',   bg: 'hover:bg-orange-500/10',   activeBg: 'bg-orange-500/20'  },
    'LHA': { border: 'border-slate-400',    text: 'text-slate-300',    bg: 'hover:bg-slate-400/10',    activeBg: 'bg-slate-400/20'   },
    'SSJ': { border: 'border-yellow-400',   text: 'text-yellow-400',   bg: 'hover:bg-yellow-400/10',   activeBg: 'bg-yellow-400/20'  },
    'LTDR':{ border: 'border-red-500',      text: 'text-red-400',      bg: 'hover:bg-red-500/10',      activeBg: 'bg-red-500/20'     },
    'HDW': { border: 'border-purple-500',   text: 'text-purple-400',   bg: 'hover:bg-purple-500/10',   activeBg: 'bg-purple-500/20'  },
    'WDO': { border: 'border-cyan-500',     text: 'text-cyan-400',     bg: 'hover:bg-cyan-500/10',     activeBg: 'bg-cyan-500/20'    },
    'CDC': { border: 'border-indigo-500',   text: 'text-indigo-400',   bg: 'hover:bg-indigo-500/10',   activeBg: 'bg-indigo-500/20'  },
    'WLRS':{ border: 'border-emerald-500',  text: 'text-emerald-400',  bg: 'hover:bg-emerald-500/10',  activeBg: 'bg-emerald-500/20' },
    'INF': { border: 'border-pink-500',     text: 'text-pink-400',     bg: 'hover:bg-pink-500/10',     activeBg: 'bg-pink-500/20'    },
};

export default function Leaderboard() {
    const { players } = usePlayers();
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('winrate');
    const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

    const filteredAndSorted = useMemo(() => {
        if (!players) return [];
        let list = [...players];

        if (selectedTeam) {
            list = list.filter(p => p.acronyme === selectedTeam);
        }
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q));
        }

        list.sort((a, b) => {
            switch (sortBy) {
                case 'winrate': return parseFloat(b.modes.rm_solo.win_rate) - parseFloat(a.modes.rm_solo.win_rate);
                case 'games':   return (b.modes.rm_solo.wins_count + b.modes.rm_solo.losses_count) - (a.modes.rm_solo.wins_count + a.modes.rm_solo.losses_count);
                case 'mmr':     return b.modes.rm_solo.mmrChange - a.modes.rm_solo.mmrChange;
                case 'civs':    return b.modes.rm_solo.nombreCivDiffJouer - a.modes.rm_solo.nombreCivDiffJouer;
                default:        return 0;
            }
        });

        return list;
    }, [players, selectedTeam, search, sortBy]);

    const SortButton = ({ label, value, color }: { label: string; value: SortKey; color: string }) => (
        <button
            onClick={() => setSortBy(value)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                sortBy === value
                    ? `${color} bg-white/10`
                    : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
            }`}
        >
            {label} {sortBy === value && '▼'}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-blue-500" />
                <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    Leaderboard Joueurs
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500 to-blue-500" />
            </div>

            {/* Team filter buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                <button
                    onClick={() => setSelectedTeam(null)}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${
                        selectedTeam === null
                            ? 'border-white text-white bg-white/10'
                            : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
                    }`}
                >
                    Toutes les équipes
                </button>
                {teamsNameAndId.map(team => {
                    const c = TEAM_COLORS[team.acronyme] ?? { border: 'border-gray-500', text: 'text-gray-400', bg: 'hover:bg-gray-500/10', activeBg: 'bg-gray-500/20' };
                    const isActive = selectedTeam === team.acronyme;
                    return (
                        <button
                            key={team.acronyme}
                            onClick={() => setSelectedTeam(isActive ? null : team.acronyme)}
                            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${c.border} ${c.text} ${
                                isActive ? c.activeBg : `bg-transparent ${c.bg}`
                            }`}
                        >
                            {team.acronyme}
                        </button>
                    );
                })}
            </div>

            {/* Search bar */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                    <input
                        type="text"
                        placeholder="Rechercher un joueur…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 text-white placeholder-gray-500 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Sort buttons (mobile) */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 justify-center lg:hidden">
                <SortButton label="Winrate" value="winrate" color="border-yellow-400 text-yellow-400" />
                <SortButton label="Games"   value="games"   color="border-blue-400 text-blue-400" />
                <SortButton label="MMR ±"   value="mmr"     color="border-cyan-400 text-cyan-400" />
                <SortButton label="Civs"    value="civs"    color="border-amber-400 text-amber-400" />
            </div>

            {/* Table */}
            <div className="bg-gray-900/60 border border-gray-700/50">
                {/* Desktop header */}
                <div className="hidden lg:grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-2">Joueur</div>
                    <div className="col-span-2">Équipe</div>
                    <button onClick={() => setSortBy('winrate')} className={`col-span-1 text-center hover:text-yellow-400 transition-colors ${sortBy === 'winrate' ? 'text-yellow-400' : ''}`}>
                        Win Rate {sortBy === 'winrate' && '▼'}
                    </button>
                    <button onClick={() => setSortBy('games')} className={`col-span-1 text-center hover:text-blue-400 transition-colors ${sortBy === 'games' ? 'text-blue-400' : ''}`}>
                        Games {sortBy === 'games' && '▼'}
                    </button>
                    <div className="col-span-2 text-center">V / D</div>
                    <button onClick={() => setSortBy('mmr')} className={`col-span-2 text-center hover:text-cyan-400 transition-colors ${sortBy === 'mmr' ? 'text-cyan-400' : ''}`}>
                        MMR ± {sortBy === 'mmr' && '▼'}
                    </button>
                    <button onClick={() => setSortBy('civs')} className={`col-span-1 text-center hover:text-amber-400 transition-colors ${sortBy === 'civs' ? 'text-amber-400' : ''}`}>
                        Civs {sortBy === 'civs' && '▼'}
                    </button>
                </div>

                {/* Rows */}
                {!players || players.length === 0 ? (
                    <div className="text-white text-center py-12">Chargement des joueurs…</div>
                ) : filteredAndSorted.length === 0 ? (
                    <div className="text-gray-400 text-center py-12 text-sm">Aucun joueur trouvé</div>
                ) : (
                    <div className="divide-y divide-gray-700/30">
                        {filteredAndSorted.map((player, index) => {
                            const teamColor = TEAM_COLORS[player.acronyme] ?? { border: 'border-gray-500', text: 'text-gray-400', bg: '', activeBg: '' };
                            const games = player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count;
                            const mmr = player.modes.rm_solo.mmrChange;

                            return (
                                <div
                                    key={index}
                                    className={`px-3 sm:px-4 hover:bg-white/5 transition-colors duration-150 ${
                                        player.isCap ? `border-l-2 ${teamColor.border}` : 'border-l-2 border-transparent'
                                    } ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                                >
                                    {/* Mobile layout */}
                                    <div className="lg:hidden py-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-gray-500 font-bold text-sm w-6 text-center flex-shrink-0">{index + 1}</span>
                                            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                                {player.isCap && <span className="text-yellow-400 flex-shrink-0">👑</span>}
                                                <span className={`font-bold text-sm truncate ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                                                    {player.name}
                                                </span>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-0.5 border ${teamColor.border} ${teamColor.text} flex-shrink-0`}>
                                                {player.acronyme}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1.5 text-xs ml-9">
                                            <div className="bg-yellow-900/20 border border-yellow-500/30 px-2 py-1 text-center">
                                                <div className="text-yellow-400 font-bold">{player.modes.rm_solo.win_rate}%</div>
                                                <div className="text-gray-500">WR</div>
                                            </div>
                                            <div className="bg-blue-900/20 border border-blue-500/30 px-2 py-1 text-center">
                                                <div className="text-blue-400 font-bold">{games}</div>
                                                <div className="text-gray-500">Games</div>
                                            </div>
                                            <div className={`border px-2 py-1 text-center ${mmr >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                                <div className={`font-bold ${mmr >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                    {mmr >= 0 ? '+' : ''}{mmr}
                                                </div>
                                                <div className="text-gray-500">MMR</div>
                                            </div>
                                            <div
                                                className="bg-amber-900/20 border border-amber-500/30 px-2 py-1 text-center relative cursor-pointer"
                                                onClick={() => setOpenTooltipIndex(openTooltipIndex === index ? null : index)}
                                            >
                                                <div className="text-amber-400 font-bold">{player.modes.rm_solo.nombreCivDiffJouer}</div>
                                                <div className="text-gray-500">Civs</div>
                                                {player.modes.rm_solo.civilizations?.length > 0 && openTooltipIndex === index && (
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-44">
                                                        <div className="bg-gray-900 border-2 border-amber-500/50 rounded shadow-xl p-2">
                                                            <div className="text-amber-400 font-bold text-xs uppercase mb-1 text-center">Civs jouées</div>
                                                            <div className="space-y-0.5 max-h-48 overflow-y-auto">
                                                                {player.modes.rm_solo.civilizations.map((civ: string, i: number) => (
                                                                    <div key={i} className="text-gray-300 text-xs px-2 py-0.5 bg-gray-800/50">{civ}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop layout */}
                                    <div className="hidden lg:grid grid-cols-12 gap-2 items-center py-3">
                                        <div className="col-span-1 text-center">
                                            <span className="text-gray-500 font-bold">{index + 1}</span>
                                        </div>
                                        <div className="col-span-2 flex items-center gap-2">
                                            {player.isCap && <span className="text-yellow-400 flex-shrink-0">👑</span>}
                                            <span className={`font-bold truncate ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                                                {player.name}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex items-center gap-2">
                                            <span className={`text-xs font-bold px-2 py-0.5 border ${teamColor.border} ${teamColor.text}`}>
                                                {player.acronyme}
                                            </span>
                                            <span className="text-gray-400 text-sm truncate">{player.teamName}</span>
                                        </div>
                                        <div className="col-span-1 text-center">
                                            <span className="text-yellow-400 font-bold">{player.modes.rm_solo.win_rate}%</span>
                                        </div>
                                        <div className="col-span-1 text-center">
                                            <span className="text-blue-400 font-semibold">{games}</span>
                                        </div>
                                        <div className="col-span-2 text-center">
                                            <span className="text-green-400 font-bold">{player.modes.rm_solo.wins_count}W</span>
                                            <span className="text-gray-600 mx-1">/</span>
                                            <span className="text-red-400 font-bold">{player.modes.rm_solo.losses_count}L</span>
                                        </div>
                                        <div className="col-span-2 text-center">
                                            <div className={`font-bold ${mmr >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                {mmr >= 0 ? '+' : ''}{mmr}
                                            </div>
                                            <div className="text-gray-500 text-xs">{player.modes.rm_solo.mmrBeg} → {player.modes.rm_solo.mmrEnd}</div>
                                        </div>
                                        <div className="col-span-1 text-center relative group">
                                            <span className="text-amber-400 font-bold">{player.modes.rm_solo.nombreCivDiffJouer}</span>
                                            {player.modes.rm_solo.civilizations?.length > 0 && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-44">
                                                    <div className="bg-gray-900 border-2 border-amber-500/50 rounded shadow-xl p-2">
                                                        <div className="text-amber-400 font-bold text-xs uppercase mb-1 text-center">Civs jouées</div>
                                                        <div className="space-y-0.5 max-h-64 overflow-y-auto">
                                                            {player.modes.rm_solo.civilizations.map((civ: string, i: number) => (
                                                                <div key={i} className="text-gray-300 text-xs px-2 py-0.5 bg-gray-800/50">{civ}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer count */}
            <div className="text-center mt-3 text-xs text-gray-600">
                {filteredAndSorted.length} joueur{filteredAndSorted.length !== 1 ? 's' : ''} affiché{filteredAndSorted.length !== 1 ? 's' : ''}
            </div>
        </div>
    );
}
