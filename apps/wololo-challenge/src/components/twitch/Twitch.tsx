import { useMemo, useState } from 'react';
import { usePlayers } from '../../hook/usePlayers';
import { useWololoTeams } from '../../hook/useWololoTeams';
import { useTwitchSection } from '../../hook/useTwitchSection';
import { COLOR_PALETTE, DEFAULT_TEAM_COLOR } from '../../common/teamColors';
import { TeamFilterDropdown } from '../leaderboard/TeamFilterDropdown';
import TwitchSection from '../TwitchSection';
import { TwitchChannelCard } from './TwitchChannelCard';

export default function Twitch() {
    const { players } = usePlayers();
    const teams = useWololoTeams();
    const twitchState = useTwitchSection();
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const teamColorById = useMemo(() => new Map(teams.map(t => [t.id, t.color])), [teams]);

    const streamsByLogin = useMemo(() => {
        if (twitchState.status !== 'live') return new Map<string, (typeof twitchState.streams)[number]>();
        return new Map(twitchState.streams.map(s => [s.user_login.toLowerCase(), s]));
    }, [twitchState]);

    const channels = useMemo(() => {
        return (players ?? [])
            .filter(p => !!p.twitchLogin)
            .map(p => ({
                player: p,
                stream: streamsByLogin.get(p.twitchLogin!.toLowerCase()) ?? null,
                color: COLOR_PALETTE[teamColorById.get(p.teamId) ?? ''] ?? DEFAULT_TEAM_COLOR,
            }))
            .sort((a, b) => {
                if (!!a.stream !== !!b.stream) return a.stream ? -1 : 1;
                if (a.stream && b.stream) return b.stream.viewer_count - a.stream.viewer_count;
                return a.player.name.localeCompare(b.player.name);
            });
    }, [players, streamsByLogin, teamColorById]);

    const filteredChannels = useMemo(() => {
        const q = search.trim().toLowerCase();
        return channels.filter(c =>
            (!selectedTeam || c.player.teamId === selectedTeam) &&
            (!q || c.player.name.toLowerCase().includes(q)),
        );
    }, [channels, selectedTeam, search]);

    const liveCount = channels.filter(c => c.stream).length;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Title */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100 flex items-center gap-3">
                        Twitch
                        {liveCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-400 border border-purple-500/30 px-2 py-0.5 bg-purple-950/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                {liveCount} live
                            </span>
                        )}
                    </h1>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Every Wololo Challenge player's Twitch channel — live or not</p>
            </div>

            {/* Featured live stream / VOD */}
            <div className="mb-10">
                <TwitchSection />
            </div>

            {/* Filters */}
            {channels.length > 0 && (
                <>
                    <TeamFilterDropdown teams={teams} selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />
                    <div className="flex justify-center mb-6">
                        <div className="relative w-full max-w-sm">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                            <input
                                type="text"
                                placeholder="Search a player..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 text-white placeholder-gray-500 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Channels grid */}
            {channels.length === 0 ? (
                <div className="text-center py-20 text-gray-600 text-sm italic">
                    No Wololo Challenge player has linked a Twitch channel yet.
                </div>
            ) : filteredChannels.length === 0 ? (
                <div className="text-center py-20 text-gray-600 text-sm italic">
                    No Twitch channel matches your filters.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredChannels.map(c => (
                        <TwitchChannelCard key={c.player.profileId} player={c.player} stream={c.stream} color={c.color} />
                    ))}
                </div>
            )}
        </div>
    );
}
