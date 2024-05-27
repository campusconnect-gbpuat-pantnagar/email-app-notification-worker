import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WorkerModule } from './worker.module';
import * as path from 'path';
async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
  Logger.log(
    'EMAIL NOTIFICATION WORKER HAS STARTED SUCCESSFULLY 🚀.',
    'Main.ts',
  );
  Logger.verbose(path.join(__dirname + '/templates/'));
}

bootstrap();
