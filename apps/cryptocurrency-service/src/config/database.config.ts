import { From } from '@unifig/core';
import { IsString } from 'class-validator';

export class DatabaseConfig {
  @From('MONGODB_CRYPTOCURRENCIES_URI')
  @IsString()
  uri!: string;
}
