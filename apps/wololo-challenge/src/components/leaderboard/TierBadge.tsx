import { useEffect, useRef, useState } from 'react';
import { RankIcon } from '@aoe4.fr/ui';
import { getTierBadgeTitle, TierBadgeDef } from '../../common/tierBadges';

interface TierBadgeProps {
    badge: TierBadgeDef;
    size?: number;
}

// Hover title doesn't work on touch devices, so tapping toggles a small tooltip instead.
export function TierBadge({ badge, size = 20 }: TierBadgeProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const title = getTierBadgeTitle(badge);

    useEffect(() => {
        if (!open) return;
        function handleOutsideClick(e: MouseEvent | TouchEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [open]);

    return (
        <div ref={containerRef} className="relative inline-flex">
            <button type="button" onClick={() => setOpen((o) => !o)} aria-label={title} className="cursor-pointer leading-none">
                <RankIcon rankLevel={badge.rankLevel} title={title} size={size} />
            </button>
            {open && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap bg-gray-900 border border-amber-500/50 text-amber-300 text-[11px] font-bold px-2 py-1 shadow-xl">
                    {title}
                </div>
            )}
        </div>
    );
}
