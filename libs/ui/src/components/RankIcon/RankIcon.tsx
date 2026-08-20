import type { CSSProperties } from 'react';

// Eagerly load all rank SVGs at build time via Vite glob import.
// Path is relative to this file: ../../assets/rank_icon/
const iconModules = import.meta.glob<string>(
  '../../assets/rank_icon/solo_*.svg',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Build a lookup table: "bronze_1" → resolved URL
const RANK_ICONS: Record<string, string> = {};
for (const [filePath, url] of Object.entries(iconModules)) {
  const match = filePath.match(/solo_(.+)\.svg$/);
  if (match) {
    RANK_ICONS[match[1]] = url;
  }
}

export interface RankIconProps {
  /** Value of rm_solo_rank_level, e.g. "conqueror_3", "diamond_2" */
  rankLevel: string | null | undefined;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Overrides the default alt/title text (which otherwise falls back to rankLevel) */
  title?: string;
}

/**
 * Displays the icon corresponding to an AoE4 rank level string.
 * Falls back to plain text when the rank is unknown or absent.
 */
export function RankIcon({ rankLevel, size = 32, className, style, title }: RankIconProps) {
  if (!rankLevel) return null;

  const src = RANK_ICONS[rankLevel];
  const label = title ?? rankLevel;
  if (!src) return <span title={label}>{label}</span>;

  return (
    <img
      src={src}
      alt={label}
      title={label}
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
}
