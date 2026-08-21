import type { CSSProperties } from 'react';

// Eagerly load all civilization flag PNGs at build time via Vite glob import.
// Path is relative to this file: ../../assets/civ_flag/
const flagModules = import.meta.glob<string>(
  '../../assets/civ_flag/*.png',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Build a lookup table: "english" → resolved URL
const CIV_FLAGS: Record<string, string> = {};
for (const [filePath, url] of Object.entries(flagModules)) {
  const match = filePath.match(/\/([^/]+)\.png$/);
  if (match) {
    CIV_FLAGS[match[1]] = url;
  }
}

export const ALL_CIVILIZATIONS: string[] = Object.keys(CIV_FLAGS).sort();

export interface CivFlagProps {
  /** Civilization key, e.g. "english", "ayyubids" */
  civilization: string | null | undefined;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Displays the flag image for an AoE4 civilization.
 * Returns null when the civilization is unknown or absent.
 */
export function CivFlag({ civilization, size, className, style }: CivFlagProps) {
  if (!civilization) return null;

  const src = CIV_FLAGS[civilization];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={civilization}
      title={civilization}
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
}
