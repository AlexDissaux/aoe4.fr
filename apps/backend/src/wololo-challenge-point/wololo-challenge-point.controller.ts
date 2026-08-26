import { Controller, Get } from '@nestjs/common';
import { WololoChallengePointService } from './wololo-challenge-point.service';

@Controller('wololo-challenge-points')
export class WololoChallengePointController {
  constructor(private readonly wololoChallengePointService: WololoChallengePointService) {}

  @Get()
  getFeed() {
    return this.wololoChallengePointService.getFeed();
  }

  @Get('players')
  getPlayerSummaries() {
    return this.wololoChallengePointService.getPlayerSummaries();
  }
}
