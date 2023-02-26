import { DatabaseConfig } from './database.config';
import { From, Nested } from '@unifig/core';
import { IsDefined, IsInt } from 'class-validator';

export class AppConfig {
  @From('BACKEND_PORT')
  @IsInt()
  port!: number;

  @Nested(() => DatabaseConfig)
  @IsDefined()
  database!: DatabaseConfig;
}
