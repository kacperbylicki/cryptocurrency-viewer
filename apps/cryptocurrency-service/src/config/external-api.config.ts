import { From } from '@unifig/core';
import { IsString } from 'class-validator';

export class ExternalApiConfig {
  @From('RAPID_API_KEY')
  @IsString()
  public rapidApiKey!: string;
}
