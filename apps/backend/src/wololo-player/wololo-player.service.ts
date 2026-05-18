import { Injectable } from "@nestjs/common";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { WololoPLayerApi } from "./wololo-player.api";

@Injectable()
export class WololoPlayerService {

    constructor(private readonly wololoPlayerApi: WololoPLayerApi) {}

    private wololoPlayers: WololoPlayer[] = []

    getWololoPlayers() {
        return this.wololoPlayers;
    }

    setWololoPLayers() {
        let wololoPlayersfetched = this.wololoPlayerApi.fetchWololoPlayer();

        
    }
}