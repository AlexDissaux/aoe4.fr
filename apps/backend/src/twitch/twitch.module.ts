import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchController } from './twitch.controller';
import { TwitchService } from './twitch.service';
import { TwitchApiService } from './twitch-api.service';
import { TwitchChannelRepository } from './twitch-channel.repository';
import { TwitchSyncScheduler } from './twitch-sync.scheduler';
import { TwitchChannel } from './entities/twitch-channel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TwitchChannel])],
    controllers: [TwitchController],
    providers: [TwitchService, TwitchApiService, TwitchChannelRepository, TwitchSyncScheduler],
    exports: [TwitchApiService],
})
export class TwitchModule {}
