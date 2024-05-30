import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);
  app.flushLogs();
  app.enableShutdownHooks();

  try {
    const port = configService.get<number>('PORT') || 9000;
    const host = configService.get<string>('HOST');
    const protocol = configService.get<string>('PROTOCOL');
    await app.listen(port);
    Logger.log(
      `🚀 email app notification worker is running on: ${protocol}://${host}:${port}/${globalPrefix}`,
    );
  } catch (error) {
    Logger.warn(error);
  }
}

bootstrap();
