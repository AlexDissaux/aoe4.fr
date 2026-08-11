import { useTeams, } from '../../hook/useTeams';
import { PodiumCard } from './PodiumCard';
import { RankedRow } from './RankedRow';


export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 text-gray-500 text-sm tracking-widest uppercase">
                Loading podium...
            </div>
        );
    }

    const top3 = teams.slice(0, 3);
    const rest = teams.slice(3);

    return (
        <div className="max-w-4xl mx-auto space-y-8 px-4 py-6">
            {/* Header */}
            <div className="mb-1 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Team Ranking</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
            </div>

            {/* Podium visuel top 3 */}
            <div className="flex items-end justify-center gap-3 sm:gap-6">
                {top3.map((team, i) => (
                    <PodiumCard key={team.teamId} team={team} rank={i} />
                ))}
            </div>

            {/* Reste du classement */}
            {rest.length > 0 && (
                <div className="space-y-2">
                    {rest.map((team) => (
                        <RankedRow key={team.teamId} team={team} rank={team.rank} />
                    ))}
                </div>
            )}
        </div>
    );
}
