import { Injectable, Logger } from "@nestjs/common";
import { API_BASE_URL } from "src/config/api.config";
interface PlayerGamesResponse {
    total_count: number;
    games: any[];
}

export interface WololoPlayerRaw {
    profileId: number;
    name: string;
    teamId: string;
    team: string;
    isCap: boolean;
    games: any[];
    twitchLogin: string | null;
}

@Injectable()
export class WololoPlayerApi {
    private readonly logger = new Logger(WololoPlayerApi.name);

    public async fetchPlayerInfo(playerId: number): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            this.logger.log(`Fetched player info for ${playerId}`);
            return response.json();
        } catch (err) {
            this.logger.error(`Failed to fetch player info for ${playerId}: ${err}`);
            throw err;
        }
    }
}
