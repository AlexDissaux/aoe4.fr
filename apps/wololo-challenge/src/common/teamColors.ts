import { TeamColor } from '../components/leaderboard/leaderboard.types';

export const COLOR_PALETTE_HEX: Record<string, string> = {
    'orange': '#f97316',
    'slate':  '#94a3b8',
    'green':  '#22c55e',
    'cyan':   '#06b6d4',
    'purple': '#a855f7',
    'yellow': '#eab308',
    'red':    '#f43f5e', 
    'pink':   '#ec4899', 

    // additional base colors (shade 500)
    'gray':     '#6b7280',
    'zinc':     '#71717a',
    'amber':    '#f59e0b', 
    'lime':     '#84cc16', 
    'emerald':  '#10b981', 
    'teal':     '#14b8a6',
    'sky':      '#0ea5e9',
    'blue':     '#3b82f6',
    'indigo':   '#6366f1',
    'violet':   '#8b5cf6',
    'fuchsia':  '#d946ef',
    'rose':     '#f43f5e',
    'neutral':  '#737373',
    'stone':    '#78716c',

    // darker variants (shade 700)
    'orange-dark':  '#c2410c',
    'slate-dark':   '#334155',
    'green-dark':   '#15803d',
    'cyan-dark':    '#0e7490',
    'purple-dark':  '#7e22ce',
    'yellow-dark':  '#a16207',
    'red-dark':     '#b91c1c',
    'pink-dark':    '#be185d',
    'gray-dark':    '#374151',
    'emerald-dark': '#047857', 
    'teal-dark':    '#0f766e', 
    'sky-dark':     '#0369a1',
    'blue-dark':    '#1d4ed8',
    'indigo-dark':  '#4338ca',  // used until here
    'violet-dark':  '#6d28d9',
    'fuchsia-dark': '#a21caf',
    'rose-dark':    '#be123c',
    'zinc-dark':    '#3f3f46',
    'neutral-dark': '#404040',
    'stone-dark':   '#44403c',
    'amber-dark':   '#b45309',
    'lime-dark':    '#4d7c0f',

    // lighter variants (shade 300)
    'red-light':    '#fca5a5',
    'blue-light':   '#93c5fd',
    'green-light':  '#86efac',
    'purple-light': '#d8b4fe',
    'orange-light': '#fdba74',
    'pink-light':   '#f9a8d4',
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

    // additional base colors (shade 500)
    'gray':     { border: 'border-gray-500',     text: 'text-gray-400',     bg: 'hover:bg-gray-500/10',     activeBg: 'bg-gray-500/20'     },
    'zinc':     { border: 'border-zinc-500',     text: 'text-zinc-400',     bg: 'hover:bg-zinc-500/10',     activeBg: 'bg-zinc-500/20'     },
    'neutral':  { border: 'border-neutral-500',  text: 'text-neutral-400',  bg: 'hover:bg-neutral-500/10',  activeBg: 'bg-neutral-500/20'  },
    'stone':    { border: 'border-stone-500',    text: 'text-stone-400',    bg: 'hover:bg-stone-500/10',    activeBg: 'bg-stone-500/20'    },
    'amber':    { border: 'border-amber-500',    text: 'text-amber-400',    bg: 'hover:bg-amber-500/10',    activeBg: 'bg-amber-500/20'    },
    'lime':     { border: 'border-lime-500',     text: 'text-lime-400',     bg: 'hover:bg-lime-500/10',     activeBg: 'bg-lime-500/20'     },
    'emerald':  { border: 'border-emerald-500',  text: 'text-emerald-400',  bg: 'hover:bg-emerald-500/10',  activeBg: 'bg-emerald-500/20'  },
    'teal':     { border: 'border-teal-500',     text: 'text-teal-400',     bg: 'hover:bg-teal-500/10',     activeBg: 'bg-teal-500/20'     },
    'sky':      { border: 'border-sky-500',      text: 'text-sky-400',      bg: 'hover:bg-sky-500/10',      activeBg: 'bg-sky-500/20'      },
    'blue':     { border: 'border-blue-500',     text: 'text-blue-400',     bg: 'hover:bg-blue-500/10',     activeBg: 'bg-blue-500/20'     },
    'indigo':   { border: 'border-indigo-500',   text: 'text-indigo-400',   bg: 'hover:bg-indigo-500/10',   activeBg: 'bg-indigo-500/20'   },
    'violet':   { border: 'border-violet-500',   text: 'text-violet-400',   bg: 'hover:bg-violet-500/10',   activeBg: 'bg-violet-500/20'   },
    'fuchsia':  { border: 'border-fuchsia-500',  text: 'text-fuchsia-400',  bg: 'hover:bg-fuchsia-500/10',  activeBg: 'bg-fuchsia-500/20'  },
    'rose':     { border: 'border-rose-500',     text: 'text-rose-400',     bg: 'hover:bg-rose-500/10',     activeBg: 'bg-rose-500/20'     },

    // darker variants (shade 700), text stays lighter for readability on dark backgrounds
    'orange-dark':  { border: 'border-orange-700',  text: 'text-orange-400',  bg: 'hover:bg-orange-700/10',  activeBg: 'bg-orange-700/20'  },
    'slate-dark':   { border: 'border-slate-700',   text: 'text-slate-400',   bg: 'hover:bg-slate-700/10',   activeBg: 'bg-slate-700/20'   },
    'green-dark':   { border: 'border-green-700',   text: 'text-green-400',   bg: 'hover:bg-green-700/10',   activeBg: 'bg-green-700/20'   },
    'cyan-dark':    { border: 'border-cyan-700',    text: 'text-cyan-400',    bg: 'hover:bg-cyan-700/10',    activeBg: 'bg-cyan-700/20'    },
    'purple-dark':  { border: 'border-purple-700',  text: 'text-purple-400',  bg: 'hover:bg-purple-700/10',  activeBg: 'bg-purple-700/20'  },
    'yellow-dark':  { border: 'border-yellow-700',  text: 'text-yellow-400',  bg: 'hover:bg-yellow-700/10',  activeBg: 'bg-yellow-700/20'  },
    'red-dark':     { border: 'border-red-700',     text: 'text-red-400',     bg: 'hover:bg-red-700/10',     activeBg: 'bg-red-700/20'     },
    'pink-dark':    { border: 'border-pink-700',    text: 'text-pink-400',    bg: 'hover:bg-pink-700/10',    activeBg: 'bg-pink-700/20'    },
    'gray-dark':    { border: 'border-gray-700',    text: 'text-gray-400',    bg: 'hover:bg-gray-700/10',    activeBg: 'bg-gray-700/20'    },
    'zinc-dark':    { border: 'border-zinc-700',    text: 'text-zinc-400',    bg: 'hover:bg-zinc-700/10',    activeBg: 'bg-zinc-700/20'    },
    'neutral-dark': { border: 'border-neutral-700', text: 'text-neutral-400', bg: 'hover:bg-neutral-700/10', activeBg: 'bg-neutral-700/20' },
    'stone-dark':   { border: 'border-stone-700',   text: 'text-stone-400',   bg: 'hover:bg-stone-700/10',   activeBg: 'bg-stone-700/20'   },
    'amber-dark':   { border: 'border-amber-700',   text: 'text-amber-400',   bg: 'hover:bg-amber-700/10',   activeBg: 'bg-amber-700/20'   },
    'lime-dark':    { border: 'border-lime-700',    text: 'text-lime-400',    bg: 'hover:bg-lime-700/10',    activeBg: 'bg-lime-700/20'    },
    'emerald-dark': { border: 'border-emerald-700', text: 'text-emerald-400', bg: 'hover:bg-emerald-700/10', activeBg: 'bg-emerald-700/20' },
    'teal-dark':    { border: 'border-teal-700',    text: 'text-teal-400',    bg: 'hover:bg-teal-700/10',    activeBg: 'bg-teal-700/20'    },
    'sky-dark':     { border: 'border-sky-700',     text: 'text-sky-400',     bg: 'hover:bg-sky-700/10',     activeBg: 'bg-sky-700/20'     },
    'blue-dark':    { border: 'border-blue-700',    text: 'text-blue-400',    bg: 'hover:bg-blue-700/10',    activeBg: 'bg-blue-700/20'    },
    'indigo-dark':  { border: 'border-indigo-700',  text: 'text-indigo-400',  bg: 'hover:bg-indigo-700/10',  activeBg: 'bg-indigo-700/20'  },
    'violet-dark':  { border: 'border-violet-700',  text: 'text-violet-400',  bg: 'hover:bg-violet-700/10',  activeBg: 'bg-violet-700/20'  },
    'fuchsia-dark': { border: 'border-fuchsia-700', text: 'text-fuchsia-400', bg: 'hover:bg-fuchsia-700/10', activeBg: 'bg-fuchsia-700/20' },
    'rose-dark':    { border: 'border-rose-700',    text: 'text-rose-400',    bg: 'hover:bg-rose-700/10',    activeBg: 'bg-rose-700/20'    },

    // lighter variants (shade 300)
    'red-light':    { border: 'border-red-300',    text: 'text-red-300',    bg: 'hover:bg-red-300/10',    activeBg: 'bg-red-300/20'    },
    'blue-light':   { border: 'border-blue-300',   text: 'text-blue-300',   bg: 'hover:bg-blue-300/10',   activeBg: 'bg-blue-300/20'   },
    'green-light':  { border: 'border-green-300',  text: 'text-green-300',  bg: 'hover:bg-green-300/10',  activeBg: 'bg-green-300/20'  },
    'purple-light': { border: 'border-purple-300', text: 'text-purple-300', bg: 'hover:bg-purple-300/10', activeBg: 'bg-purple-300/20' },
    'orange-light': { border: 'border-orange-300', text: 'text-orange-300', bg: 'hover:bg-orange-300/10', activeBg: 'bg-orange-300/20' },
    'pink-light':   { border: 'border-pink-300',   text: 'text-pink-300',   bg: 'hover:bg-pink-300/10',   activeBg: 'bg-pink-300/20'   },
};

export const DEFAULT_TEAM_COLOR: TeamColor = {
    border: 'border-gray-500',
    text: 'text-gray-400',
    bg: 'hover:bg-gray-500/10',
    activeBg: 'bg-gray-500/20',
};
