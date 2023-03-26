import { AppConfig, DatabaseConfig } from '@/config';
import { Config } from '@unifig/core';
import { ConfigModule, getConfigContainerToken } from '@unifig/nest';
import { CryptocurrencyModule } from '@/modules';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      templates: [DatabaseConfig],
      default: AppConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [getConfigContainerToken(DatabaseConfig)],
      useFactory: async () => ({
        uri: Config.getValues(DatabaseConfig).uri,
      }),
    }),
    CryptocurrencyModule,
  ],
})
export class AppModule {}
