import { Injectable, Logger } from '@nestjs/common';
import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_API_BASE = 'https://api.twitch.tv/helix';
const AOE4_GAME_NAME = 'Age of Empires IV';

@Injectable()
export class TwitchApiService {
    private readonly logger = new Logger(TwitchApiService.name);

    private accessToken: string | null = null;
    private tokenExpiry = 0;
    private gameId: string | null = null;

    private get clientId(): string {
        return process.env.TWITCH_CLIENT_ID ?? '';
    }

    private get clientSecret(): string {
        return process.env.TWITCH_CLIENT_SECRET ?? '';
    }

    private async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        if (!this.clientId || !this.clientSecret) {
            throw new Error('TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET is not configured');
        }

        const params = new URLSearchParams({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'client_credentials',
        });

        const res = await fetch(`${TWITCH_TOKEN_URL}?${params}`, { method: 'POST' });
        if (!res.ok) throw new Error(`Twitch auth failed: ${res.status}`);

        const data = await res.json() as { access_token: string; expires_in: number };
        this.accessToken = data.access_token;
        // Subtract 5 minutes from expiry for safety margin
        this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

        return this.accessToken;
    }

    private async fetchWithAuth<T>(url: string): Promise<T> {
        const token = await this.getAccessToken();
        const res = await fetch(url, {
            headers: {
                'Client-Id': this.clientId,
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error(`Twitch API error: ${res.status} — ${url}`);
        return res.json() as Promise<T>;
    }

    private async getAoE4GameId(): Promise<string> {
        if (this.gameId) return this.gameId;

        const data = await this.fetchWithAuth<{ data: { id: string }[] }>(
            `${TWITCH_API_BASE}/games?name=${encodeURIComponent(AOE4_GAME_NAME)}`,
        );

        const id = data.data[0]?.id;
        if (!id) throw new Error('AoE4 game not found on Twitch');

        this.gameId = id;
        this.logger.log(`AoE4 Twitch game ID: ${id}`);
        return id;
    }

    async fetchLiveStreams(): Promise<ITwitchStream[]> {
        const gameId = await this.getAoE4GameId();
        const url = `${TWITCH_API_BASE}/streams?game_id=${gameId}&language=fr&first=20`;
        const data = await this.fetchWithAuth<{ data: ITwitchStream[] }>(url);
        return data.data;
    }

    async fetchRecentVods(): Promise<ITwitchVod[]> {
        const gameId = await this.getAoE4GameId();
        const url = `${TWITCH_API_BASE}/videos?game_id=${gameId}&type=archive&first=20`;
        const data = await this.fetchWithAuth<{ data: ITwitchVod[] }>(url);
        return data.data;
    }

    async fetchStreamsByLogins(logins: string[]): Promise<ITwitchStream[]> {
        if (logins.length === 0) return [];
        const params = logins.map(l => `user_login=${encodeURIComponent(l)}`).join('&');
        const data = await this.fetchWithAuth<{ data: ITwitchStream[] }>(
            `${TWITCH_API_BASE}/streams?${params}&first=100`,
        );
        return data.data;
    }

    async fetchVodsByLogins(logins: string[]): Promise<ITwitchVod[]> {
        if (logins.length === 0) return [];
        // Resolve logins → user_ids
        const params = logins.map(l => `login=${encodeURIComponent(l)}`).join('&');
        const users = await this.fetchWithAuth<{ data: { id: string; login: string }[] }>(
            `${TWITCH_API_BASE}/users?${params}`,
        );
        if (users.data.length === 0) return [];

        const idParams = users.data.map(u => `user_id=${u.id}`).join('&');
        const vods = await this.fetchWithAuth<{ data: ITwitchVod[] }>(
            `${TWITCH_API_BASE}/videos?${idParams}&type=archive&first=5`,
        );
        return vods.data;
    }
}
