export function StatPill({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{label}</span>
            <span className="text-white font-bold text-sm leading-none">
                {value}{sub && <span className="text-gray-500 text-xs font-normal">{sub}</span>}
            </span>
        </div>
    );
}
