import { useTeams } from '../../hook/useTeams';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';

const MAX_TEAMS_DISPLAYED = 10;

export default function PodiumLight() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 text-gray-500 text-sm tracking-widest uppercase">
                Loading podium...
            </div>
        );
    }

    const topTeams = teams.slice(0, MAX_TEAMS_DISPLAYED);
    const maxPoints = Math.max(...topTeams.map((team) => team.totalPoints), 1);

    return (
        <div className="max-w-4xl mx-auto space-y-8 px-4 py-6">
            <div className="mb-1 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Team Ranking</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
            </div>

            <div className="space-y-0">
                {topTeams.map((team) => {
                    const accent = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;
                    const widthPercent = Math.max(28, (team.totalPoints / maxPoints) * 100);

                    return (
                        <div
                            key={team.teamId}
                            className="h-10 flex items-center justify-between px-3 border bg-black"
                            style={{
                                width: `${widthPercent}%`,
                                borderColor: accent,
                            }}
                        >
                            <span className="text-sm font-semibold truncate" style={{ color: accent }}>{team.name}</span>
                            <span className="text-sm font-black tabular-nums ml-3 shrink-0" style={{ color: accent }}>{team.totalPoints}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}