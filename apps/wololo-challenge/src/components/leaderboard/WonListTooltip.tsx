interface WonListTooltipProps {
    title: string;
    items: string[];
}

export function WonListTooltip({ title, items }: WonListTooltipProps) {
    return (
        <div className="bg-gray-900 border-2 border-amber-500/50 rounded shadow-xl p-2">
            <div className="text-amber-400 font-bold text-xs uppercase mb-1 text-center">{title}</div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
                {items.map((item, i) => (
                    <div key={i} className="text-gray-300 text-xs px-2 py-0.5 bg-gray-800/50">{item}</div>
                ))}
            </div>
        </div>
    );
}
