import { useChallengeSummaries } from '../../hook/useChallengeSummaries';
import { useChallengeFeed } from '../../hook/useChallengeFeed';
import { ChallengeSummaryRow } from './ChallengeSummaryRow';
import { ChallengeFeedItem } from './ChallengeFeedItem';

export default function Challenges() {
    const { summaries } = useChallengeSummaries();
    const { feed } = useChallengeFeed();

    if (summaries.length === 0 && feed.length === 0) {
        return <div className="text-white text-center py-24">Loading challenges...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-10">
            <div className="mb-1 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">
                        Challenges
                    </h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="text-sm text-gray-500 max-w-2xl mx-auto text-center">
                    Bonus points awarded to players for completing special community challenges.
                </p>
            </div>

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-2 px-1">Player rankings</h3>
                <div className="bg-gray-900/60 border border-gray-700/50">
                    {summaries.length === 0 ? (
                        <div className="text-gray-400 text-center py-12 text-sm">No challenge points awarded yet</div>
                    ) : (
                        <div className="divide-y divide-gray-700/30">
                            {summaries.map((summary, index) => (
                                <ChallengeSummaryRow key={summary.profileId} summary={summary} rank={index + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-2 px-1">Latest challenges</h3>
                <div className="bg-gray-900/60 border border-gray-700/50">
                    {feed.length === 0 ? (
                        <div className="text-gray-400 text-center py-12 text-sm">No challenges recorded yet</div>
                    ) : (
                        <div className="divide-y divide-gray-700/30">
                            {feed.map((entry) => (
                                <ChallengeFeedItem key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
