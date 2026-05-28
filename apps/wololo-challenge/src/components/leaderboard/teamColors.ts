import { TeamColor } from './leaderboard.types';

export const TEAMS = ['ODW', 'Lash', 'aoeItalia', 'cup of tea', 'Shing Shong'];

export const TEAM_COLORS: Record<string, TeamColor> = {
    'ODW':         { border: 'border-orange-500', text: 'text-orange-400', bg: 'hover:bg-orange-500/10', activeBg: 'bg-orange-500/20' },
    'Lash':        { border: 'border-slate-400',  text: 'text-slate-300',  bg: 'hover:bg-slate-400/10',  activeBg: 'bg-slate-400/20'  },
    'SSJ':         { border: 'border-yellow-400', text: 'text-yellow-400', bg: 'hover:bg-yellow-400/10', activeBg: 'bg-yellow-400/20' },
    'aoeItalia':   { border: 'border-green-500',  text: 'text-green-400',  bg: 'hover:bg-green-500/10',  activeBg: 'bg-green-500/20'  },
    'cup of tea':  { border: 'border-cyan-500',   text: 'text-cyan-400',   bg: 'hover:bg-cyan-500/10',   activeBg: 'bg-cyan-500/20'   },
    'Shing Shong': { border: 'border-purple-500', text: 'text-purple-400', bg: 'hover:bg-purple-500/10', activeBg: 'bg-purple-500/20' },
};

export const DEFAULT_TEAM_COLOR: TeamColor = {
    border: 'border-gray-500',
    text: 'text-gray-400',
    bg: 'hover:bg-gray-500/10',
    activeBg: 'bg-gray-500/20',
};
