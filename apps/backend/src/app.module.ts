import { AppConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@unifig/nest';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ default: AppConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
