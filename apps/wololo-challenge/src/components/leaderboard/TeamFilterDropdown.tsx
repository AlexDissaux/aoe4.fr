import { useEffect, useMemo, useRef, useState } from 'react';
import { IWololoTeam } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE, COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';

interface TeamFilterDropdownProps {
    teams: IWololoTeam[];
    selectedTeam: string | null;
    onTeamChange: (team: string | null) => void;
}

export function TeamFilterDropdown({ teams, selectedTeam, onTeamChange }: TeamFilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedTeamData = useMemo(
        () => teams.find(t => t.id === selectedTeam) ?? null,
        [teams, selectedTeam],
    );

    const filteredTeams = useMemo(() => {
        if (!search.trim()) return teams;
        const q = search.trim().toLowerCase();
        return teams.filter(t => t.name.toLowerCase().includes(q));
    }, [teams, search]);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    function handleSelect(teamId: string | null) {
        onTeamChange(teamId);
        setIsOpen(false);
        setSearch('');
    }

    const selectedColorHex = selectedTeamData
        ? COLOR_PALETTE_HEX[selectedTeamData.color] ?? DEFAULT_TEAM_COLOR_HEX
        : null;

    return (
        <div ref={containerRef} className="relative w-full max-w-xs mx-auto mb-4">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full flex items-center gap-2 bg-gray-900 border border-gray-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-blue-500 transition-colors"
            >
                {selectedColorHex && (
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedColorHex }} />
                )}
                <span className="truncate">{selectedTeamData ? selectedTeamData.name : 'All teams'}</span>
                <span className={`ml-auto text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full bg-gray-900 border border-gray-600 shadow-lg">
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search a team..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-800 border-b border-gray-600 text-white placeholder-gray-500 px-3 py-2 text-sm focus:outline-none"
                    />
                    <div className="max-h-56 overflow-y-auto">
                        <button
                            onClick={() => handleSelect(null)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 ${
                                selectedTeam === null ? 'text-white font-bold bg-white/10' : 'text-gray-300'
                            }`}
                        >
                            All teams
                        </button>
                        {filteredTeams.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-500">No team found</div>
                        ) : (
                            filteredTeams.map(team => {
                                const c = COLOR_PALETTE[team.color] ?? DEFAULT_TEAM_COLOR;
                                const colorHex = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;
                                const isActive = selectedTeam === team.id;
                                return (
                                    <button
                                        key={team.id}
                                        onClick={() => handleSelect(team.id)}
                                        className={`w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-white/10 ${c.text} ${
                                            isActive ? 'font-bold bg-white/10' : ''
                                        }`}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colorHex }} />
                                        <span className="truncate">{team.name}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
