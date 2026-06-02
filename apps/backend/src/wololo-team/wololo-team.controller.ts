import { Controller, Get } from '@nestjs/common';
import { WololoTeamService } from './wololo-team.service';

@Controller('wololo-teams')
export class WololoTeamController {
    constructor(private readonly wololoTeamService: WololoTeamService) {}

    @Get('')
    getAll() {
        return this.wololoTeamService.getAll();
    }
}
