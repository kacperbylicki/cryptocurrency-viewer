import { AppConfig } from './config/app.config';
import { Config } from '@unifig/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { toJSON } from '@unifig/validation-presenter-json';

async function bootstrap(): Promise<void> {
  const validationError = await Config.register({
    template: AppConfig,
    adapter: new EnvConfigAdapter(),
  });

  if (validationError) {
    // eslint-disable-next-line no-console
    console.error(toJSON(validationError));
    process.exit(1);
  }

  const { AppModule } = await import('./app.module');

  const app = await NestFactory.create(AppModule, { cors: true, bufferLogs: true });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cryptocurrency Viewer')
    .setDescription('cryptocurrency viewer app')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(Config.getValues(AppConfig).port);
}
bootstrap();
