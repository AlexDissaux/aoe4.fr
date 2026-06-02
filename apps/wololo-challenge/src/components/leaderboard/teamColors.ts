import { TeamColor } from './leaderboard.types';

export const COLOR_PALETTE_HEX: Record<string, string> = {
    'orange': '#f97316',
    'slate':  '#94a3b8',
    'green':  '#22c55e',
    'cyan':   '#06b6d4',
    'purple': '#a855f7',
    'yellow': '#eab308',
    'red':    '#f43f5e',
    'pink':   '#ec4899',
};

export const DEFAULT_TEAM_COLOR_HEX = '#6b7280';

/**
 * Maps a color key (stored in DB) to Tailwind classes.
 * When adding a new team color via admin, add the corresponding entry here.
 */
export const COLOR_PALETTE: Record<string, TeamColor> = {
    'orange': { border: 'border-orange-500', text: 'text-orange-400', bg: 'hover:bg-orange-500/10', activeBg: 'bg-orange-500/20' },
    'slate':  { border: 'border-slate-400',  text: 'text-slate-300',  bg: 'hover:bg-slate-400/10',  activeBg: 'bg-slate-400/20'  },
    'green':  { border: 'border-green-500',  text: 'text-green-400',  bg: 'hover:bg-green-500/10',  activeBg: 'bg-green-500/20'  },
    'cyan':   { border: 'border-cyan-500',   text: 'text-cyan-400',   bg: 'hover:bg-cyan-500/10',   activeBg: 'bg-cyan-500/20'   },
    'purple': { border: 'border-purple-500', text: 'text-purple-400', bg: 'hover:bg-purple-500/10', activeBg: 'bg-purple-500/20' },
    'yellow': { border: 'border-yellow-400', text: 'text-yellow-400', bg: 'hover:bg-yellow-400/10', activeBg: 'bg-yellow-400/20' },
    'red':    { border: 'border-red-500',    text: 'text-red-400',    bg: 'hover:bg-red-500/10',    activeBg: 'bg-red-500/20'    },
    'pink':   { border: 'border-pink-500',   text: 'text-pink-400',   bg: 'hover:bg-pink-500/10',   activeBg: 'bg-pink-500/20'   },
};

export const DEFAULT_TEAM_COLOR: TeamColor = {
    border: 'border-gray-500',
    text: 'text-gray-400',
    bg: 'hover:bg-gray-500/10',
    activeBg: 'bg-gray-500/20',
};
