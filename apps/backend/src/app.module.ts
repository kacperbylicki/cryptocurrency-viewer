import { AppConfig } from './config/app.config';
import { ConfigModule } from '@unifig/nest';
import { HealthModule } from './modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ default: AppConfig }), HealthModule],
})
export class AppModule {}
