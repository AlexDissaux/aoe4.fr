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

            <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">1. Overview</h3>
                    <p>
                        The Wololo Challenge rewards activity and consistency as much as versatility: the more a team plays and wins matches,
                        the better its chances of performing well — but diversity in civilizations and maps also plays a decisive role in
                        aiming for the top of the rankings.
                    </p>
                    <p>
                        The overall ranking is calculated from several categories, detailed below. In each category, teams are ranked and
                        awarded points based on their position: with N participating teams, 1st place earns N points, 2nd place earns
                        N-1 points, and so on down to 1 point for last place. This way, every team scores at least one point in each
                        category, even if they finish last — no one goes home empty-handed.
                    </p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">2. Game Wins</h3>
                    <p>
                        Each player's victories contribute to their team's total number of wins. The more wins a team has on its record,
                        the higher it ranks in the Wins category, and the more points it earns.
                    </p>
                    <p>
                        Wins are counted individually: every player taking part in a game contributes 1 win to their team if their side
                        wins the game — even in mixed team games where players from different teams face each other. For a game to be
                        valid, every player involved must be registered for the Wololo Challenge.
                    </p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">3. Civilizations Played</h3>
                    <p>
                        This category rewards diversity of civilizations played and won with. Each time a player wins a game with a given
                        civilization for the first time, their team earns 1 point toward this category — each civilization only counts once
                        per player. With 23 civilizations available, a team's diversity score is used to rank it against the others.
                    </p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">4. Maps Won</h3>
                    <p>
                        This category rewards diversity of maps played and won on. Each time a player wins a game on a given map for the
                        first time, their team earns 1 point toward this category — each map only counts once per player. With 18 maps in
                        total, a team's diversity score is used to rank it against the others.
                    </p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">5. Civilization King 👑</h3>
                    <p>
                        The King of a civilization is the player who has the most wins with that civilization. If another player surpasses
                        the current King's win count, they automatically become the new King. Holding a crown grants the King's team
                        <span className="text-amber-300 font-bold"> 10 bonus points</span>.
                    </p>
                    <p>⚠️ A player can only be King of one civilization at a time — the crown of any other civilization stays up for grabs.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">6. Team Milestones</h3>
                    <p>
                        Badges are awarded when a team reaches certain win milestones: 25, 100, 200, 300, 400, 500, 700 and 1000 wins.
                        Each time a team reaches a new milestone, it earns <span className="text-amber-300 font-bold">5 points</span> and a
                        badge for that milestone.
                    </p>
                    <p>⚠️ Only the first 10 teams to reach each milestone claim a badge — will your team be fast enough?</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">7. Special Events</h3>
                    <p>Participating in certain special events held during the Wololo Challenge lets players earn bonus points for their team:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold text-white">The Multiplex</span> — an evening where one player per team joins a muted voice channel and tries to win as many games as possible during a 3-hour window.</li>
                        <li><span className="font-bold text-white">The Rising Empires LEL / Warchief</span> — a tournament based on players' ELO. Each series (BO) won earns 1 bonus point for the player's team.</li>
                        <li><span className="font-bold text-white">Nightshift Gaming tournaments</span> — bonus points awarded according to the rules announced for each event.</li>
                    </ul>
                    <p>Points earned through these events are cumulative and added directly to the overall Wololo Challenge standings.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">8. The Challenge</h3>
                    <p>Each player has the opportunity to earn 1 bonus point for their team by completing a personal challenge:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Play on <span className="font-bold text-white">Very Hard / Conqueror mode</span> on Contested Coastline.</li>
                        <li>Survive for at least 45 minutes with 3 different civilizations.</li>
                        <li>Post a screenshot of each successful run in the designated channel — a civilization only counts once confirmed.</li>
                    </ul>
                    <p>Each player can earn this bonus point only once, for a maximum of 5 bonus points per team (one per player).</p>
                </section>
            </div>

            <div className="border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-xs text-amber-200/70 text-center">
                These rules are subject to change — check back for the final version before the challenge starts.
            </div>
        </div>
    );
}
