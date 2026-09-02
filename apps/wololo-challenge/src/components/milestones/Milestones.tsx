import { useEffect, useMemo, useRef, useState } from 'react';
import { useTierStandings } from '../../hook/useTierStandings';
import { MAX_BADGES_PER_TIER, TIER_BADGES } from '../../common/tierBadges';
import { IWololoTierBadgeStanding } from '@aoe4.fr/shared-types';
import { TierSelector } from './TierSelector';
import { TierCard } from './TierCard';

export default function Milestones() {
    const { standings } = useTierStandings();
    const tiers = TIER_BADGES;

    const standingByThreshold = useMemo(() => new Map(standings.map((s) => [s.threshold, s])), [standings]);

    const [activeThreshold, setActiveThreshold] = useState(tiers[0].threshold);
    const trackRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef(new Map<number, HTMLDivElement>());
    const rafRef = useRef<number | null>(null);

    function updateActiveFromScroll() {
        const track = trackRef.current;
        if (!track) return;
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = activeThreshold;
        let closestDist = Infinity;
        for (const [threshold, el] of itemRefs.current) {
            const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
            if (dist < closestDist) {
                closestDist = dist;
                closest = threshold;
            }
        }
        setActiveThreshold(closest);
    }

    function handleScroll() {
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            updateActiveFromScroll();
        });
    }

    function scrollToThreshold(threshold: number, behavior: ScrollBehavior = 'smooth') {
        itemRefs.current.get(threshold)?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
    }

    function goDelta(delta: number) {
        const i = tiers.findIndex((t) => t.threshold === activeThreshold);
        scrollToThreshold(tiers[(i + delta + tiers.length) % tiers.length].threshold);
    }

    useEffect(() => {
        // Center the initial tier without animating on first paint.
        scrollToThreshold(tiers[0].threshold, 'auto');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (standings.length === 0) {
        return <div className="text-white text-center py-24">Loading milestones...</div>;
    }

    return (
        <div className="py-6 space-y-6">
            <div className="mb-1 text-center px-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Team Milestones</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
                    The first {MAX_BADGES_PER_TIER} teams to reach each win milestone earn its badge.
                </p>
            </div>

            <TierSelector tiers={tiers} activeThreshold={activeThreshold} onSelect={(threshold) => scrollToThreshold(threshold)} />

            <div className="relative">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4"
                >
                    {/* Spacers so the first/last cards can still scroll to dead center, without shrinking card width like container padding would */}
                    <div aria-hidden className="shrink-0 w-[9%] sm:w-[20%] md:w-[27%]" />
                    {tiers.map((tier) => {
                        const standing: IWololoTierBadgeStanding =
                            standingByThreshold.get(tier.threshold) ?? { threshold: tier.threshold, claimed: [], remaining: MAX_BADGES_PER_TIER };
                        const isActive = tier.threshold === activeThreshold;
                        return (
                            <div
                                key={tier.threshold}
                                ref={(el) => {
                                    if (el) itemRefs.current.set(tier.threshold, el);
                                    else itemRefs.current.delete(tier.threshold);
                                }}
                                className="snap-center shrink-0 w-[82%] sm:w-[60%] md:w-[46%] h-[440px] sm:h-[500px] transition-all duration-500 ease-out"
                                style={{ transform: isActive ? 'scale(1)' : 'scale(0.82)', opacity: isActive ? 1 : 0.35 }}
                            >
                                <TierCard tier={tier} standing={standing} active={isActive} onClick={() => scrollToThreshold(tier.threshold)} />
                            </div>
                        );
                    })}
                    <div aria-hidden className="shrink-0 w-[9%] sm:w-[20%] md:w-[27%]" />
                </div>

                {/* Edge fades hinting at more tiers on each side */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black/90 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black/90 to-transparent" />

                <button
                    type="button"
                    onClick={() => goDelta(-1)}
                    aria-label="Previous milestone"
                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-amber-300/30 text-amber-300 text-xl flex items-center justify-center opacity-60 hover:opacity-100 hover:border-amber-300/70 transition"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => goDelta(1)}
                    aria-label="Next milestone"
                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-amber-300/30 text-amber-300 text-xl flex items-center justify-center opacity-60 hover:opacity-100 hover:border-amber-300/70 transition"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
