export interface LiveTwitchProps {
    twitchLogin: string;
}

export function LiveTwitch({ twitchLogin }: LiveTwitchProps) {
    return (
        <a
            href={`https://twitch.tv/${twitchLogin}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400 border border-purple-500/40 bg-purple-950/40 hover:bg-purple-950/70 transition-colors focus:outline-none"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />
            Live
        </a>
    );
}
