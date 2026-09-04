import { Link } from 'react-router-dom';

function SectionCard({
    icon,
    number,
    title,
    linkTo,
    linkLabel,
    children,
}: {
    icon: string;
    number: number;
    title: string;
    linkTo?: string;
    linkLabel?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-lg border border-white/5 bg-gray-900/40 p-5 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="flex items-center gap-2 font-bold uppercase tracking-wider text-white text-sm sm:text-base">
                    <span>{icon}</span>
                    {number}. {title}
                </h3>
                {linkTo && (
                    <Link
                        to={linkTo}
                        className="shrink-0 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-amber-300/40 text-amber-300 hover:bg-amber-300/10 transition-colors"
                    >
                        {linkLabel} →
                    </Link>
                )}
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export default function Rules() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Rules</h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="text-gray-400 text-sm">Official rules of the Wololo Challenge</p>
            </div>

            <div className="space-y-4">
                <SectionCard icon="📋" number={1} title="Overview">
                    <p>
                        The Wololo Challenge rewards activity and consistency as much as versatility: the more a team plays and wins
                        matches, the better its chances — but diversity in civilizations and maps also plays a decisive role in aiming
                        for the top of the rankings.
                    </p>
                    <p>The overall ranking is calculated from the categories below. In each one, teams are ranked and awarded points based on their position:</p>
                    <div className="rounded-lg border border-amber-300/20 bg-amber-300/5 px-4 py-2 text-amber-100/90 text-sm">
                        With <span className="font-bold text-amber-300">N</span> teams, 1st place earns <span className="font-bold text-amber-300">N</span> points,
                        2nd earns <span className="font-bold text-amber-300">N-1</span>, down to 1 point for last place — everyone scores at least once.
                    </div>
                </SectionCard>

                <SectionCard icon="⚔️" number={2} title="Game Wins" linkTo="/leaderboard" linkLabel="View leaderboard">
                    <ul className="list-disc list-inside space-y-1">
                        <li>Every win contributes 1 win to a player's team, boosting the team's rank in the Wins category.</li>
                        <li>Counted individually — even in mixed team games where players from different teams face each other.</li>
                        <li>For a game to be valid, every player involved must be registered for the Wololo Challenge.</li>
                    </ul>
                </SectionCard>

                <SectionCard icon="🏛️" number={3} title="Civilizations Played" linkTo="/leaderboard" linkLabel="View leaderboard">
                    <ul className="list-disc list-inside space-y-1">
                        <li>Rewards diversity of civilizations played and won with.</li>
                        <li>First win with a civilization earns the team 1 point — each civilization only counts once per player.</li>
                        <li>23 civilizations available in total.</li>
                    </ul>
                </SectionCard>

                <SectionCard icon="🗺️" number={4} title="Maps Won" linkTo="/leaderboard" linkLabel="View leaderboard">
                    <ul className="list-disc list-inside space-y-1">
                        <li>Rewards diversity of maps played and won on.</li>
                        <li>First win on a map earns the team 1 point — each map only counts once per player.</li>
                        <li>18 maps available in total.</li>
                    </ul>
                </SectionCard>

                <SectionCard icon="👑" number={5} title="Civilization King" linkTo="/kings" linkLabel="View kings">
                    <ul className="list-disc list-inside space-y-1">
                        <li>The King of a civilization is the player with the most wins with it.</li>
                        <li>The crown automatically transfers if another player surpasses the current King's win count.</li>
                        <li>Holding a crown grants the King's team <span className="text-amber-300 font-bold">10 bonus points</span>.</li>
                    </ul>
                    <p className="text-amber-200/70 text-xs">⚠️ A player can only be King of one civilization at a time — every other crown stays up for grabs.</p>
                </SectionCard>

                <SectionCard icon="🏆" number={6} title="Team Milestones" linkTo="/milestones" linkLabel="View milestones">
                    <ul className="list-disc list-inside space-y-1">
                        <li>Badges are awarded at win milestones: 25, 100, 200, 300, 400, 500, 700 and 1000 wins.</li>
                        <li>Each new milestone earns the team <span className="text-amber-300 font-bold">5 points</span> and a badge.</li>
                    </ul>
                    <p className="text-amber-200/70 text-xs">⚠️ Only the first 10 teams to reach each milestone claim a badge — will your team be fast enough?</p>
                </SectionCard>

                <SectionCard icon="⭐" number={7} title="Special Events">
                    <p>Participating in certain special events held during the Wololo Challenge lets players earn bonus points for their team:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold text-white">The Multiplex</span> — an evening where one player per team joins a muted voice channel and tries to win as many games as possible during a 3-hour window.</li>
                        <li><span className="font-bold text-white">The Rising Empires LEL / Warchief</span> — a tournament based on players' ELO. Each series (BO) won earns 1 bonus point for the player's team.</li>
                        <li><span className="font-bold text-white">Nightshift Gaming tournaments</span> — bonus points awarded according to the rules announced for each event.</li>
                    </ul>
                    <p>Points earned through these events are cumulative and added directly to the overall Wololo Challenge standings.</p>
                </SectionCard>

                <SectionCard icon="🎯" number={8} title="The Challenge" linkTo="/challenges" linkLabel="View challenges">
                    <p>Each player has the opportunity to earn 1 bonus point for their team by completing a personal challenge:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Play on <span className="font-bold text-white">Very Hard / Conqueror mode</span> on Contested Coastline.</li>
                        <li>Survive for at least 45 minutes with 3 different civilizations.</li>
                        <li>Post a screenshot of each successful run in the designated channel — a civilization only counts once confirmed.</li>
                    </ul>
                    <p>Each player can earn this bonus point only once, for a maximum of 5 bonus points per team (one per player).</p>
                </SectionCard>
            </div>

            <div className="border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-xs text-amber-200/70 text-center">
                These rules are subject to change — check back for the final version before the challenge starts.
            </div>
        </div>
    );
}
