import { ITwitchStream, WololoPlayer } from '@aoe4.fr/shared-types';
import { TeamColor } from '../leaderboard/leaderboard.types';

function TwitchLogo({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
    );
}

function formatViewers(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

interface TwitchChannelCardProps {
    player: WololoPlayer;
    stream: ITwitchStream | null;
    color: TeamColor;
}

export function TwitchChannelCard({ player, stream, color }: TwitchChannelCardProps) {
    const isLive = !!stream;
    const thumbnail = stream
        ? stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')
        : null;

    return (
        <a
            href={`https://twitch.tv/${player.twitchLogin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block bg-gray-900/60 border overflow-hidden transition-colors ${
                isLive ? 'border-purple-500/50 hover:border-purple-400' : 'border-gray-700/50 hover:border-gray-500/60'
            }`}
        >
            {/* Preview */}
            <div className="relative aspect-video bg-black overflow-hidden">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={`${player.name} stream preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <TwitchLogo size={32} />
                    </div>
                )}

                {isLive ? (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-purple-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Live
                    </span>
                ) : (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-black/60">
                        Offline
                    </span>
                )}

                {isLive && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-black/70">
                        {formatViewers(stream!.viewer_count)} viewers
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-3 space-y-1">
                <div className="flex items-center gap-2 min-w-0">
                    {player.isCap && <span className="text-yellow-400 text-xs flex-shrink-0">👑</span>}
                    <span className={`font-bold text-sm truncate ${isLive ? 'text-white' : 'text-gray-300'}`}>
                        {player.name}
                    </span>
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 border flex-shrink-0 ${color.border} ${color.text}`}>
                        {player.team}
                    </span>
                </div>
                <p className={`text-xs truncate ${isLive ? 'text-gray-400' : 'text-gray-600 italic'}`}>
                    {isLive ? stream!.title : 'Not streaming right now'}
                </p>
            </div>
        </a>
    );
}
