import type { CSSProperties } from 'react';

export interface PlayerLinkProps {
    profileId: number;
    name: string;
    className?: string;
    style?: CSSProperties;
}

export function PlayerLink({ profileId, name, className, style }: PlayerLinkProps) {
    return (
        <a
            href={`https://aoe4world.com/players/${profileId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={style}
            onClick={(e) => e.stopPropagation()}
        >
            {name}
        </a>
    );
}
