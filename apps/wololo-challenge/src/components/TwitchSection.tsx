import { useState } from 'react';
import { ITwitchStream } from '@aoe4.fr/shared-types';
import { useTwitchSection } from '../hook/useTwitchSection';

function TwitchLogo({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
    );
}

function formatViewers(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function TwitchEmbed({ channel, parent }: { channel: string; parent: string }) {
    const src = `https://player.twitch.tv/?channel=${channel}&parent=${parent}&autoplay=true&muted=false`;
    return (
        <iframe
            src={src}
            allowFullScreen
            className="w-full aspect-video rounded-lg border border-white/5"
            title={`Twitch stream – ${channel}`}
        />
    );
}

function VodEmbed({ videoId, parent }: { videoId: string; parent: string }) {
    const src = `https://player.twitch.tv/?video=${videoId}&parent=${parent}&autoplay=false`;
    return (
        <iframe
            src={src}
            allowFullScreen
            className="w-full aspect-video rounded-lg border border-white/5"
            title={`Twitch VOD`}
        />
    );
}

function StreamTab({ stream, selected, onClick }: { stream: ITwitchStream; selected: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${selected
                    ? 'bg-purple-700/40 text-white border border-purple-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="truncate max-w-[120px]">{stream.user_name}</span>
            <span className="text-xs text-gray-500 flex-shrink-0">{formatViewers(stream.viewer_count)}</span>
        </button>
    );
}

export default function TwitchSection() {
    const state = useTwitchSection();
    const parent = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

    const [selectedLogin, setSelectedLogin] = useState<string | null>(null);

    if (state.status === 'loading') {
        return (
            <div className="flex items-center justify-center py-12 text-gray-600 text-sm gap-2">
                <TwitchLogo size={14} />
                <span>Vérification des streams…</span>
            </div>
        );
    }

    if (state.status === 'offline') {
        return (
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-3 px-5 py-4 rounded-lg bg-gray-900/60 border border-white/5 text-gray-500 text-sm">
                    <TwitchLogo size={16} />
                    <span>Aucun joueur du challenge n'est actuellement en live.</span>
                </div>
            </div>
        );
    }

    if (state.status === 'vod') {
        return (
            <div className="max-w-3xl mx-auto px-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <TwitchLogo size={14} />
                    <span>Dernière VOD disponible</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-white font-medium">{state.vod.user_name}</span>
                </div>
                <VodEmbed videoId={state.vod.id} parent={parent} />
                <p className="text-xs text-gray-600 truncate">{state.vod.title}</p>
            </div>
        );
    }

    // live
    const currentLogin = selectedLogin ?? state.selected.user_login;
    const currentStream = state.streams.find(s => s.user_login === currentLogin) ?? state.selected;

    return (
        <div className="max-w-3xl mx-auto px-4 space-y-3">
            {/* Tabs si plusieurs streams */}
            {state.streams.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {state.streams.map(s => (
                        <StreamTab
                            key={s.user_login}
                            stream={s}
                            selected={s.user_login === currentLogin}
                            onClick={() => setSelectedLogin(s.user_login)}
                        />
                    ))}
                </div>
            )}

            {/* Player */}
            <TwitchEmbed channel={currentStream.user_login} parent={parent} />

            {/* Titre du stream */}
            <p className="text-xs text-gray-500 truncate">{currentStream.title}</p>
        </div>
    );
}
