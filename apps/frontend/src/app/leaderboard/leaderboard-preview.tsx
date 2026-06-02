import { Link } from 'react-router-dom';
import { RankIcon, PlayerLink } from '@aoe4.fr/ui';
import { useLeaderboard } from './useLeaderboard';

export function LeaderboardPreview() {
  const { players, isLoading } = useLeaderboard();

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">🏆 Classement Solo</span>
        <Link to="/classement" className="text-xs text-zinc-400 hover:text-white transition-colors">Voir tout →</Link>
      </div>
      {isLoading ? (
        <div className="px-4 py-6 text-sm text-zinc-500">Chargement…</div>
      ) : (
        <ul className="overflow-y-auto max-h-[280px]">
          {players.slice(0, 25).map((player, i) => (
            <li key={player.id} className="flex items-center gap-3 px-4 py-2.5 border-t border-zinc-800 text-sm hover:bg-zinc-800 transition-colors">
              <span className="w-5 text-center font-mono text-xs text-zinc-500">{i + 1}</span>
              <RankIcon rankLevel={player.rm_solo_rank_level} size={20} />
              <PlayerLink profileId={player.id} name={player.name} className="flex-1 truncate font-medium hover:text-amber-400 transition-colors" />
              <span className="font-mono text-amber-400 text-xs">{player.rm_solo_rating}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
