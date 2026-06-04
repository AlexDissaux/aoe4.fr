import { Injectable, Logger } from '@nestjs/common';
import { IYouTubeVideo } from '@aoe4.fr/shared-types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const AOE4_QUERIES = ['"Age of Empires IV"', '"AOE4"'];

interface YoutubeSearchItem {
  id: { videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
    liveBroadcastContent: 'none' | 'live' | 'upcoming';
  };
}

interface YoutubeSearchResponse {
  items: YoutubeSearchItem[];
}

@Injectable()
export class YouTubeApiService {
  private readonly logger = new Logger(YouTubeApiService.name);

  private get apiKey(): string {
    return process.env.YOUTUBE_API_KEY ?? '';
  }

  private mapItem(item: YoutubeSearchItem): IYouTubeVideo {
    return {
      id: item.id.videoId,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url ?? '',
      isLive: item.snippet.liveBroadcastContent === 'live',
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    };
  }

  private async search(extraParams: Record<string, string>): Promise<IYouTubeVideo[]> {
    if (!this.apiKey) {
      this.logger.warn('YOUTUBE_API_KEY is not configured, skipping YouTube API call');
      return [];
    }

    const results = await Promise.all(
      AOE4_QUERIES.map(async (q) => {
        const params = new URLSearchParams({
          part: 'snippet',
          q,
          type: 'video',
          videoCategoryId: '20',
          maxResults: '10',
          key: this.apiKey,
          relevanceLanguage: 'fr',
          ...extraParams,
        });

        const res = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);
        if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);

        const data = await res.json() as YoutubeSearchResponse;
        return (data.items ?? []).map((item) => this.mapItem(item));
      }),
    );

    // Deduplicate by video id, preserving order
    const seen = new Set<string>();
    return results.flat().filter((v) => {
      if (seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });
  }

  async fetchRecentVideos(): Promise<IYouTubeVideo[]> {
    return this.search({ order: 'date' });
  }

  async fetchLiveStreams(): Promise<IYouTubeVideo[]> {
    return this.search({ eventType: 'live', order: 'relevance' });
  }
}
