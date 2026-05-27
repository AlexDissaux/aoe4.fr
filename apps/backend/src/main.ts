/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables FIRST, before any other imports
// __dirname at runtime = apps/backend/dist — go 3 levels up to reach monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const rawOrigins = process.env.CORS_ORIGIN ?? 'http://localhost:4200';
    const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());
    app.enableCors({
      origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
    });
    // const globalPrefix = 'api';
    // app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/`,
    );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
