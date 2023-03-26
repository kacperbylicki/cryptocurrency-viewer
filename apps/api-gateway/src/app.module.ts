import { AccountModule, CryptocurrencyModule, HealthModule } from '@/modules';
import { AppConfig } from '@/config';
import { ConfigModule } from '@unifig/nest';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ default: AppConfig }),
    AccountModule,
    CryptocurrencyModule,
    HealthModule,
  ],
})
export class AppModule {}
