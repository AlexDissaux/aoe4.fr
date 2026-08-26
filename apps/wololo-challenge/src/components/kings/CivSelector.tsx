import { CivFlag } from '@aoe4.fr/ui';
import { formatCivLabel } from '../../common/kingBadges';

export interface CivSelectorProps {
    civs: string[];
    activeCiv: string;
    onSelect: (civ: string) => void;
}

export function CivSelector({ civs, activeCiv, onSelect }: CivSelectorProps) {
    return (
        <div className="flex gap-2 overflow-x-auto thin-scrollbar px-4 sm:px-[10%] pb-1">
            {civs.map((civ) => {
                const isActive = civ === activeCiv;
                return (
                    <button
                        key={civ}
                        type="button"
                        onClick={() => onSelect(civ)}
                        title={formatCivLabel(civ)}
                        className={`shrink-0 flex flex-col items-center gap-1 px-2 py-1.5 rounded-md border transition ${isActive
                            ? 'border-amber-300/70 bg-amber-300/10'
                            : 'border-transparent opacity-50 hover:opacity-90 hover:border-gray-600'
                            }`}
                    >
                        <CivFlag civilization={civ} size={28} />
                        <span className={`text-[10px] uppercase tracking-wide whitespace-nowrap ${isActive ? 'text-amber-300 font-bold' : 'text-gray-500'}`}>
                            {formatCivLabel(civ)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
