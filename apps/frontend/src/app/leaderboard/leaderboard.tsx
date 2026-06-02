import { useState } from 'react';
import { RankIcon, PlayerLink } from '@aoe4.fr/ui';
import { PLayerLeaderboard } from '@aoe4.fr/shared-types';

const PAGE_SIZE = 50;

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
    .reduce<(number | '…')[]>((acc, p, i, arr) => {
      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('…');
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900 text-sm">
      <span className="text-zinc-500">
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} sur {total}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ‹
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`e-${i}`} className="px-2 py-1 text-zinc-600">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`min-w-[2rem] px-2 py-1 rounded border transition-colors ${
                p === page
                  ? 'bg-amber-500 border-amber-500 text-zinc-900 font-bold'
                  : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}

interface Props {
  players: PLayerLeaderboard[];
  isLoading: boolean;
}

export function LeaderboardTable({ players, isLoading }: Props) {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const paginated = players.slice(offset, offset + PAGE_SIZE);

  return (
    <div>
      {isLoading && (
        <div className="py-16 text-center text-zinc-500">Chargement du classement…</div>
      )}

      {!isLoading && players.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-900 text-xs uppercase tracking-widest text-zinc-400">
                <th className="w-12 px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Joueur</th>
                <th className="px-4 py-3 text-center">Rang</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3 text-center">V / D</th>
                <th className="px-4 py-3 text-center">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((player, index) => {
                const wins = player.rm_solo_wins_count ?? 0;
                const losses = player.rm_solo_losses_count ?? 0;
                const total = wins + losses;
                const winRate = total > 0 ? Math.round((wins / total) * 100) : null;

                return (
                  <tr
                    key={player.id}
                    className="border-t border-zinc-800 bg-zinc-900 transition-colors hover:bg-zinc-800"
                  >
                    <td className="px-4 py-3 text-center font-mono text-sm text-zinc-500">
                      {offset + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      <PlayerLink profileId={player.id} name={player.name} className="hover:text-amber-400 transition-colors" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <RankIcon rankLevel={player.rm_solo_rank_level} size={28} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-semibold text-amber-400">
                      {player.rm_solo_rating ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-emerald-400">{wins}</span>
                      <span className="mx-1 text-zinc-600">/</span>
                      <span className="text-red-400">{losses}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">
                      {winRate !== null ? (
                        <span className="text-slate-300">{winRate}%</span>
                      ) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            page={page}
            total={players.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

