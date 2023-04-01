import { From } from '@unifig/core';
import { IsString } from 'class-validator';

export class ExternalApiConfig {
  @From('RAPID_API_KEY')
  @IsString()
  public rapidApiKey!: string;

  @From('BING_NEWS_API_KEY')
  @IsString()
  public bingNewsApiHost!: string;

  @From('COIN_RANKING_API_HOST')
  @IsString()
  public coinRankingApiHost!: string;
}
