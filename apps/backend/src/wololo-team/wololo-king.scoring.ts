import { IWololoTeam, IWololoCivContender, IWololoCivKingStanding, WololoPlayer } from '@aoe4.fr/shared-types';

export const KING_POINTS = 15;

interface CivBid {
    profileId: number;
    civ: string;
    wins: number;
}

// Assigns at most one civ "king" per player: the civ where they have the most wins.
// A civ whose top spot is tied between two+ players is left permanently unclaimed ("disputed"),
// but the tied players remain free to claim a different (lower) civ from their own stats.
export function computeCivKingStandings(players: WololoPlayer[], teams: IWololoTeam[]): IWololoCivKingStanding[] {
    const teamsById = new Map(teams.map((t) => [t.id, t]));
    const playersById = new Map(players.map((p) => [p.profileId, p]));

    const bids: CivBid[] = [];
    const perCivContenders = new Map<string, CivBid[]>();
    for (const player of players) {
        for (const [civ, wins] of Object.entries(player.civWins ?? {})) {
            if (wins <= 0) continue;
            const bid: CivBid = { profileId: player.profileId, civ, wins };
            bids.push(bid);
            const list = perCivContenders.get(civ) ?? [];
            list.push(bid);
            perCivContenders.set(civ, list);
        }
    }

    const assignedPlayer = new Map<number, string>(); // profileId -> civ they were crowned king of
    const resolvedCiv = new Set<string>(); // civ already decided (king or permanently disputed)

    let remaining = bids.filter((b) => !assignedPlayer.has(b.profileId) && !resolvedCiv.has(b.civ));
    while (remaining.length > 0) {
        const maxWins = Math.max(...remaining.map((b) => b.wins));
        const civsAtLevel = Array.from(new Set(remaining.filter((b) => b.wins === maxWins).map((b) => b.civ))).sort();

        for (const civ of civsAtLevel) {
            const eligible = (perCivContenders.get(civ) ?? []).filter(
                (b) => b.wins === maxWins && !assignedPlayer.has(b.profileId),
            );
            if (eligible.length === 1) {
                assignedPlayer.set(eligible[0].profileId, civ);
                resolvedCiv.add(civ);
            } else if (eligible.length > 1) {
                resolvedCiv.add(civ);
            }
        }

        remaining = bids.filter((b) => !assignedPlayer.has(b.profileId) && !resolvedCiv.has(b.civ));
    }

    const kingCivByProfileId = new Map(assignedPlayer);

    function toContender(bid: CivBid, civ: string): IWololoCivContender {
        const player = playersById.get(bid.profileId) as WololoPlayer;
        const team = teamsById.get(player.teamId);
        const kingCiv = kingCivByProfileId.get(bid.profileId);
        return {
            profileId: player.profileId,
            name: player.name,
            teamId: player.teamId,
            teamName: team?.name ?? '',
            teamColor: team?.color ?? '',
            wins: bid.wins,
            alreadyKingOf: kingCiv && kingCiv !== civ ? kingCiv : null,
        };
    }

    return Array.from(perCivContenders.entries())
        .map(([civ, contenders]) => {
            const sorted = [...contenders].sort((a, b) => b.wins - a.wins || a.profileId - b.profileId);
            const kingProfileId = [...kingCivByProfileId.entries()].find(([, c]) => c === civ)?.[0];
            const kingBid = kingProfileId !== undefined ? sorted.find((b) => b.profileId === kingProfileId) : undefined;
            return {
                civ,
                king: kingBid ? toContender(kingBid, civ) : null,
                leaderboard: sorted.slice(0, 30).map((bid) => toContender(bid, civ)),
            };
        })
        .sort((a, b) => a.civ.localeCompare(b.civ));
}
