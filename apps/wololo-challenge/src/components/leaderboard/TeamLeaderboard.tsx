import { useMemo } from 'react';
import { IWololoTeamScore } from '@aoe4.fr/shared-types';
import { TeamSortKey } from './leaderboard.types';
import { TeamLeaderboardHeader } from './TeamLeaderboardHeader';
import { TeamRow } from './TeamRow';

interface TeamLeaderboardProps {
    teams: IWololoTeamScore[];
    search: string;
    sortBy: TeamSortKey;
    onSortChange: (key: TeamSortKey) => void;
}

export function TeamLeaderboard({ teams, search, sortBy, onSortChange }: TeamLeaderboardProps) {
    const filteredAndSorted = useMemo(() => {
        let list = [...teams];
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(t => t.name.toLowerCase().includes(q));
        }
        list.sort((a, b) => {
            switch (sortBy) {
                case 'wins': return b.categories.wins.points - a.categories.wins.points;
                case 'civs': return b.categories.civs.points - a.categories.civs.points;
                case 'maps': return b.categories.maps.points - a.categories.maps.points;
                case 'tiers': return b.tiers.points - a.tiers.points;
                default: return b.totalPoints - a.totalPoints;
            }
        });
        return list;
    }, [teams, search, sortBy]);

    return (
        <div className="bg-gray-900/60 border border-gray-700/50">
            <TeamLeaderboardHeader sortBy={sortBy} onSortChange={onSortChange} />

            {teams.length === 0 ? (
                <div className="text-white text-center py-12">Loading teams...</div>
            ) : filteredAndSorted.length === 0 ? (
                <div className="text-gray-400 text-center py-12 text-sm">No teams found</div>
            ) : (
                <div className="divide-y divide-gray-700/30">
                    {filteredAndSorted.map((team, index) => (
                        <TeamRow key={team.teamId} team={team} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
