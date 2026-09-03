import { useEffect, useMemo, useRef, useState } from 'react';
import { useCivKingStandings } from '../../hook/useCivKingStandings';
import { ALL_CIVILIZATIONS } from '@aoe4.fr/ui';
import { IWololoCivKingStanding } from '@aoe4.fr/shared-types';
import { CivSelector } from './CivSelector';
import { CivCard } from './CivCard';

export default function Kings() {
    const { standings } = useCivKingStandings();
    const civs = ALL_CIVILIZATIONS;

    const standingByCiv = useMemo(() => new Map(standings.map((s) => [s.civ, s])), [standings]);

    const [activeCiv, setActiveCiv] = useState(civs[0]);
    const trackRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef(new Map<string, HTMLDivElement>());
    const rafRef = useRef<number | null>(null);

    function updateActiveFromScroll() {
        const track = trackRef.current;
        if (!track) return;
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = activeCiv;
        let closestDist = Infinity;
        for (const [civ, el] of itemRefs.current) {
            const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
            if (dist < closestDist) {
                closestDist = dist;
                closest = civ;
            }
        }
        setActiveCiv(closest);
    }

    function handleScroll() {
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            updateActiveFromScroll();
        });
    }

    function scrollToCiv(civ: string, behavior: ScrollBehavior = 'smooth') {
        itemRefs.current.get(civ)?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
    }

    function goDelta(delta: number) {
        const i = civs.indexOf(activeCiv);
        scrollToCiv(civs[(i + delta + civs.length) % civs.length]);
    }

    useEffect(() => {
        // Center the initial civ without animating on first paint.
        scrollToCiv(civs[0], 'auto');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (standings.length === 0) {
        return <div className="text-white text-center py-24">Loading kings...</div>;
    }

    return (
        <div className="py-6 space-y-6">
            <div className="mb-1 text-center px-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Civ Kings</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
                    The player with the most wins on a civilization becomes its king (+10 pts for their team).
                    A player can only hold one crown — their best civilization.
                </p>
            </div>

            <CivSelector civs={civs} activeCiv={activeCiv} onSelect={(civ) => scrollToCiv(civ)} />

            <div className="relative">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4"
                >
                    {/* Spacers so the first/last cards can still scroll to dead center, without shrinking card width like container padding would */}
                    <div aria-hidden className="shrink-0 w-[9%] sm:w-[20%] md:w-[27%]" />
                    {civs.map((civ) => {
                        const standing: IWololoCivKingStanding = standingByCiv.get(civ) ?? { civ, king: null, leaderboard: [] };
                        const isActive = civ === activeCiv;
                        return (
                            <div
                                key={civ}
                                ref={(el) => {
                                    if (el) itemRefs.current.set(civ, el);
                                    else itemRefs.current.delete(civ);
                                }}
                                className="snap-center shrink-0 w-[82%] sm:w-[60%] md:w-[46%] h-[440px] sm:h-[500px] transition-all duration-500 ease-out"
                                style={{ transform: isActive ? 'scale(1)' : 'scale(0.82)', opacity: isActive ? 1 : 0.35 }}
                            >
                                <CivCard standing={standing} active={isActive} onClick={() => scrollToCiv(civ)} />
                            </div>
                        );
                    })}
                    <div aria-hidden className="shrink-0 w-[9%] sm:w-[20%] md:w-[27%]" />
                </div>

                {/* Edge fades hinting at more civs on each side */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black/90 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black/90 to-transparent" />

                <button
                    type="button"
                    onClick={() => goDelta(-1)}
                    aria-label="Previous civilization"
                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-amber-300/30 text-amber-300 text-xl flex items-center justify-center opacity-60 hover:opacity-100 hover:border-amber-300/70 transition"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => goDelta(1)}
                    aria-label="Next civilization"
                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-amber-300/30 text-amber-300 text-xl flex items-center justify-center opacity-60 hover:opacity-100 hover:border-amber-300/70 transition"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
