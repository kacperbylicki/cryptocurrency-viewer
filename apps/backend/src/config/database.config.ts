import { From } from '@unifig/core';
import { IsString } from 'class-validator';

export class DatabaseConfig {
  @From({ key: 'MONGODB_URI' })
  @IsString()
  uri!: string;

  @From({ key: 'MONGODB_DATABASE' })
  @IsString()
  name!: string;
}
