import { From } from '@unifig/core';
import { IsInt, IsString } from 'class-validator';

export class AppConfig {
  @From('NODE_ENV')
  @IsString()
  nodeEnv!: string;

  @From('PROTO_PATH')
  @IsString()
  protoPath!: string;

  @From('API_GATEWAY_PORT')
  @IsInt()
  port!: number;

  @From('API_GATEWAY_HOST')
  @IsString()
  host!: string;

  @From('ACCOUNTS_SERVICE_PORT')
  @IsInt()
  accountServicePort!: number;

  @From('CRYPTOCURRENCIES_SERVICE_PORT')
  @IsInt()
  cryptocurrencyServicePort!: number;
}
