import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from '../player';
import { LeaderboardModule } from '../leaderboard';
import { CurrentGamesModule } from '../current-games';
import { TwitchModule } from '../twitch';
import { YouTubeModule } from '../youtube';
import { DiscordModule } from '../discord';
import { WololoPlayerModule } from 'src/wololo-player/wololoPlayer.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'odw',
      autoLoadEntities: true,
      synchronize: true, // Enable for initial table creation, disable in production
      logging: process.env.NODE_ENV === 'development',
      connectTimeoutMS: 5000,
      retryAttempts: 3,
      retryDelay: 3000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    PlayerModule,
    LeaderboardModule,
    CurrentGamesModule,
    TwitchModule,
    YouTubeModule,
    DiscordModule,
    WololoPlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
