import { Injectable } from '@nestjs/common';
import { IWololoChallengePointEntry, IWololoPlayerChallengeSummary } from '@aoe4.fr/shared-types';
import { WololoChallengePointRepository } from './wololo-challenge-point.repository';

@Injectable()
export class WololoChallengePointService {
  constructor(private readonly wololoChallengePointRepository: WololoChallengePointRepository) {}

  async getFeed(): Promise<IWololoChallengePointEntry[]> {
    const entries = await this.wololoChallengePointRepository.findAll();
    return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getPlayerSummaries(): Promise<IWololoPlayerChallengeSummary[]> {
    const entries = await this.wololoChallengePointRepository.findAll();

    const summariesByProfileId = new Map<number, IWololoPlayerChallengeSummary>();
    for (const entry of entries) {
      const summary = summariesByProfileId.get(entry.profileId) ?? {
        profileId: entry.profileId,
        playerName: entry.playerName,
        teamId: entry.teamId,
        teamName: entry.teamName,
        teamColor: entry.teamColor,
        totalPoints: 0,
        entries: [],
      };
      summary.totalPoints += entry.points;
      summary.entries.push(entry);
      summariesByProfileId.set(entry.profileId, summary);
    }

    return Array.from(summariesByProfileId.values()).sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
