import { AccountModule } from '../account';
import { AppConfig } from '@/config';
import {
  CRYPTOCURRENCY_PACKAGE_NAME,
  CRYPTOCURRENCY_SERVICE_NAME,
  CryptocurrencyServiceClient,
} from '@cryptocurrency-viewer/transport';
import {
  ClientGrpc,
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { Config } from '@unifig/core';
import { ConfigModule, getConfigContainerToken } from '@unifig/nest';
import { CryptocurrencyController } from './controllers';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CRYPTOCURRENCY_SERVICE_NAME,
        imports: [ConfigModule.forFeature(AppConfig)],
        useFactory: async (): Promise<ClientProvider> => {
          const { cryptocurrencyServicePort, protoPath } =
            Config.getValues(AppConfig);

          return {
            transport: Transport.GRPC,
            options: {
              url: `cryptocurrency-viewer-cryptocurrencies-service:${cryptocurrencyServicePort}`,
              package: CRYPTOCURRENCY_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                `${protoPath}/proto/cryptocurrency.proto`,
              ),
            },
          };
        },
        inject: [getConfigContainerToken(AppConfig)],
      },
    ]),
    AccountModule,
  ],
  controllers: [CryptocurrencyController],
  providers: [
    {
      provide: CryptocurrencyServiceClient,
      useFactory: (client: ClientGrpc): CryptocurrencyServiceClient =>
        client.getService<CryptocurrencyServiceClient>(
          CRYPTOCURRENCY_SERVICE_NAME,
        ),
      inject: [CRYPTOCURRENCY_SERVICE_NAME],
    },
  ],
})
export class CryptocurrencyModule {}
