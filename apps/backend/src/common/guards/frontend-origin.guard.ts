import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

// Blocks direct/server-to-server API calls that don't originate from our own frontend.
// Not foolproof (Origin/Referer can be spoofed), but stops naive proxies/scrapers.
@Injectable()
export class FrontendOriginGuard implements CanActivate {
  private readonly logger = new Logger(FrontendOriginGuard.name);
  private readonly allowedOrigins = (
    process.env.CORS_ORIGIN ?? 'http://localhost:4200'
  )
    .split(',')
    .map((origin) => origin.trim());
  private static readonly STALL_DELAY_MS = 30_000;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin;
    const referer = request.headers.referer;
    const cfWorker = request.headers['c'+'f-wor'+'ker'] as string | undefined;

    const matchesAllowedOrigin = (value?: string) =>
      !!value &&
      this.allowedOrigins.some((allowed) => value.startsWith(allowed));

    const isBlockedWorker = !!cfWorker;
    if (
      !isBlockedWorker &&
      (matchesAllowedOrigin(origin) || matchesAllowedOrigin(referer))
    ) {
      return true;
    }

    this.logger.warn(
      `Blocked request without a valid Origin/Referer (origin="${origin}", referer="${referer}", cf-worker="${cfWorker}", ip=${request.ip}, x-forwarded-for="${request.headers['x-forwarded-for']}")`,
    );
    // Deliberately disguised as a network timeout so callers debug the wrong problem.
    await new Promise((resolve) =>
      setTimeout(resolve, FrontendOriginGuard.STALL_DELAY_MS),
    );
    throw new HttpException('Request Timeout', HttpStatus.REQUEST_TIMEOUT);
  }
}
