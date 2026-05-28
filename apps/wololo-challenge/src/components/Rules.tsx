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
                    <h3 className="font-bold uppercase tracking-wider text-white">1. Teams</h3>
                    <p>The challenge opposes several teams of players. Each team must designate a captain before the start of the competition.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">2. Ladder games</h3>
                    <p>Points are earned through ranked 1v1 games played during the challenge period. Only games played in the <span className="text-amber-300 font-semibold">rm_solo</span> queue count toward the team score.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">3. Scoring</h3>
                    <p>Each win earns points for your team. The exact scoring formula will be detailed here. Team rankings are updated in real time on the podium.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">4. Eligibility</h3>
                    <p>All registered players must be part of the French-speaking community. Only games played during the official challenge window are counted.</p>
                </section>

                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">5. Fair play</h3>
                    <p>Any form of cheating, smurfing, or unsportsmanlike behavior will result in disqualification. The organizers reserve the right to amend these rules at any time.</p>
                </section>
            </div>

            <div className="border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-xs text-amber-200/70 text-center">
                These rules are subject to change — check back for the final version before the challenge starts.
            </div>
        </div>
    );
}
