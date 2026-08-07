# aoe4.fr – Copilot Instructions

## Project Overview

**aoe4.fr** is a French-speaking Age of Empires IV community platform. It displays ranked leaderboards, live current games, and hosts the "Wololo Challenge" team tournament event. Data is pulled from the public [aoe4world.com](https://aoe4world.com/api/v0) API.

---

## Monorepo Architecture

This project is an **Nx monorepo** (Nx 22) using npm workspaces. All packages share the scope `@aoe4.fr`.

```
apps/
  backend/          NestJS 11 API (TypeORM, PostgreSQL, @nestjs/schedule)
  backend-e2e/      Backend E2E tests
  frontend/         React 19 + Vite + Tailwind CSS v4
  frontend-e2e/     Playwright E2E tests
libs/
  shared-types/     Pure TypeScript interfaces (IPlayer, ICurrentGame, …)
  ui/               Generic reusable React components & assets
  wololo-challenge/ Self-contained React lib for the ODW tournament event
```

**Tech:** TypeScript throughout. Jest (unit), Playwright (e2e), `@testing-library/react`.

**Key conventions:**
- **Types first:** define or reuse types from `@aoe4.fr/shared-types` before writing component props.
- **Workspace resolution:** the monorepo uses `"@aoe4.fr/source"` as a custom condition so Vite resolves libs directly from `src/` in dev without a build step.
- **Nx tasks:** use `nx serve`, `nx build`, `nx test`, `nx lint`. Prefer `nx affected` to only run tasks impacted by a change.

---

## Backend Conventions (NestJS)

### Module structure
Each feature has its own folder (`player/`, `leaderboard/`, `current-games/`) with an `index.ts` barrel, and responsibilities split across dedicated files:

| File | Responsibility |
|---|---|
| `<feature>.controller.ts` | HTTP routing, request/response handling only |
| `<feature>.service.ts` | Business logic and orchestration only |
| `<feature>.repository.ts` | All TypeORM data access (`find*`, `upsert`, etc.) |
| `<feature>.mapper.ts` | Mapping between API/external shapes and DB entities (plain functions, no `@Injectable`) |
| `<feature>-api.service.ts` | External HTTP API calls only (no DB access, no mapping to entity) |

**Rules:**
- **Services** must not inject TypeORM `Repository<T>` directly — use the feature's `<feature>.repository.ts` instead.
- **Mappers** are plain functions (not injectable classes), imported directly where needed.
- **API services** must not contain entity mapping logic — that belongs in the mapper.
- **Repositories** are `@Injectable()` classes registered in the module's `providers` array.

### Other conventions
- **TypeORM entities**: stored in `entities/` subfolder. Column names use `snake_case` DB names mapped to `camelCase` TS properties via the `name` option.
- **DTOs**: used for API responses, defined with `class-validator`/`class-transformer`.
- **Schedulers**: `@Cron` decorator from `@nestjs/schedule`; implement `OnApplicationBootstrap` when startup sync is needed.
- **SSE streaming**: `@Sse` + RxJS `BehaviorSubject` / `Observable` pattern (see `CurrentGamesController`).
- **Environment config**: env vars read directly from `process.env` in `app.module.ts`; no ConfigModule abstraction.
- **Logger**: `new Logger(ClassName.name)` from `@nestjs/common`.
- **Rate limiting**: always apply `delay()` between external API batch calls — never fire parallel requests to aoe4world.

---

## Frontend Conventions

- **Feature folders** under `apps/frontend/src/app/`: component, custom hook (`use*.ts`), API file (`*.api.ts`), CSS module (`*.module.css`), and `index.ts` barrel.
- **Data fetching**: custom hooks using `fetch`/`EventSource` — no React Query or SWR.
- **Styling**: Tailwind CSS v4 utility classes + CSS Modules for component-specific styles. No CSS-in-JS.
- **Routing**: React Router v6 `<Routes>/<Route>`. The `/event/*` route renders `WololoChallengeApp` from the lib.
- **Shared types**: import from `@aoe4.fr/shared-types` (alias in `tsconfig.base.json`).
- **Component granularity**: small presentational components, co-located with their feature folder.

---

## `@aoe4.fr/ui` — Shared UI Library

**Location:** `libs/ui/` — reusable React components and assets shared across apps.

- **Belongs here:** display components not tied to a specific feature; shared assets (icons, images).
- **Does NOT belong here:** feature-specific logic, data fetching, or domain types (use `shared-types`).
- **Do NOT add general-purpose components to `wololo-challenge`.**

### Current exports
- `RankIcon` — renders the AoE4 rank icon SVG for a given rank level string (e.g. `"diamond_2"`, `"conqueror_3"`). Assets live in `libs/ui/src/assets/rank_icon/` as `solo_<rank>_<level>.svg`. Accepts `rankLevel: string | null | undefined` — returns `null` when no rank is set.

```tsx
import { RankIcon } from '@aoe4.fr/ui';
<RankIcon rankLevel={player.rm_solo_rank_level} size={28} />
// Also works with ICurrentGamePlayer.rank_level:
<RankIcon rankLevel={player.rank_level} size={16} />
```

---

## Shared Types (`libs/shared-types`)

Interfaces: `IPlayer`, `IRankedStats`, `IPlayerAvatars`, `IPlayerSocial`, `ICurrentGame`, `ICurrentGamePlayer`. Imported on both frontend and backend via the `@aoe4.fr/shared-types` alias. **Never add runtime logic here.**

### `ICurrentGamePlayer`
```ts
interface ICurrentGamePlayer {
  name: string;
  civilization: string;
  civilization_randomized: boolean;
  country: string;
  rating: number | null;
  rank_level: string | null;  // cross-referenced from leaderboard cache — NOT from aoe4world API
}
```

> **Important:** the aoe4world `/games` endpoint does **not** return `rank_level`. It must be resolved by cross-referencing the player's `profile_id` against the `LeaderboardCacheService` (solo then team). This is done in `CurrentGamesService.buildRankMap()` which produces a `Map<profileId, rank_level>` passed down to the mapper.

---

## Wololo Challenge Lib (`libs/wololo-challenge`)

Self-contained React app/library for the ODW tournament. Static team/player data in `src/db/data.ts`. API calls to aoe4world are made client-side from `src/api/`. Components: `Stat/`, `BelgianLeaderboard`, `Countdown`, `LastChancePopup`, `Podium`, `Titre`.

### Language rule
- All user-facing text in Wololo Challenge must be in English (labels, headings, placeholders, tooltips, buttons, empty/loading states, and messages).

---

## Key Domain Concepts

- **French-speaking countries** (`FRENCH_SPEAKING_COUNTRIES`): `['fr', 'be', 'lu']` — filter for aoe4world data. Defined in `player/player.types.ts`.
- **Leaderboards tracked**: `rm_solo` and `rm_team`. Defined as `LEADERBOARDS` in `player/player.types.ts`.
- **Player sync**: hourly cron in `PlayerSyncScheduler` → `PlayerApiService.fetchAllPlayers()` iterates all leaderboards × countries, upserts into PostgreSQL, then refreshes `LeaderboardCacheService`.
- **Current games**: `CurrentGamesSyncScheduler` runs every 3 min, calls `setCurrentGamesFromActivePlayers()` for players with `lastGameAt` within the last 7 days.
- **Leaderboard cache**: `LeaderboardCacheService` holds two in-memory arrays: `PLayerLeaderboard[]` for solo and `PLayerLeaderboard[]` for team. Populated lazily on first request, invalidated (set to `[]`) after each player sync so the next request rehydrates from DB. Extracted into its own `LeaderboardCacheModule` (standalone) to avoid circular dependency between `PlayerModule` and `LeaderboardModule`. Can be imported by any module that needs rank data (e.g. `CurrentGamesModule`).

---

## Data Flow & Caching

### Player Sync
1. `PlayerSyncScheduler` (`@Cron(EVERY_HOUR)`) → `PlayerService.syncPlayers()`
2. `PlayerApiService` iterates `LEADERBOARDS × FRENCH_SPEAKING_COUNTRIES`, paginating with `delay(200ms)` between pages
3. Players merged by `profile_id` into a `Map<number, MergedPlayer>`, bulk-upserted into PostgreSQL
4. `LeaderboardCacheService` updated with fresh data

### Current Games & SSE
- `CurrentGamesService` holds a `BehaviorSubject<CurrentGameDto[]>` as in-memory store
- Sync runs every 3 min: active players fetched, then `fetchCurrentGames(profileIds)` called in batches of 50 with `delay(1000ms)` between batches
- Before mapping, `buildRankMap()` builds a `Map<profileId, rank_level>` from the leaderboard cache (solo first, team as fallback) and passes it to `toCurrentGameDto()`
- `games$` observable exposed via `@Sse('stream')`, pushing each `BehaviorSubject.next()` to clients
- `GET /current-games` returns current value, triggering a fresh fetch if subject is empty

### Rate Limiting
- **`delay()` utility**: `apps/backend/src/common/utils/delay.service.ts`
- Player pagination: `delay(200ms)` between pages
- Current games batching: `PROFILE_IDS_BATCH_SIZE = 50`, `delay(1000ms)` before each batch

---

## Common Commands

```bash
npm run serve:back:dev   # Backend with HMR
npm run serve:front      # Frontend dev server
nx test                  # Run all tests
nx lint                  # Lint
npm run deploy           # Build & deploy frontend (gh-pages)
```

---

## What to Avoid

- Do not use `synchronize: true` in TypeORM for production.
- Do not call `process.env` outside of `app.module.ts` or dedicated config files.
- Do not add runtime code to `libs/shared-types` — interfaces only.
