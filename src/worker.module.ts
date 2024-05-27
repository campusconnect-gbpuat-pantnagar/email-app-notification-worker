import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueModule } from './libraries/queues/queue.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailQueues } from './libraries/queues/queue.constants';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';
import { WelcomeEmailNotificationProcessor } from './app/processors/welcome.notification.processor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_SERVICE_HOST'),
          // For SSL and TLS connection
          auth: {
            // Account gmail address
            user: configService.get('SMTP_SERVICE_EMAIL'),
            pass: configService.get('SMTP_SERVICE_PASSWORD'),
          },
        },
        template: {
          dir: path.join(__dirname + '/templates/'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_APP_NOTIFICATION_HOST,
        port: Number(process.env.REDIS_APP_NOTIFICATION_PORT),
        username: process.env.REDIS_APP_NOTIFICATION_USER,
        password: process.env.REDIS_APP_NOTIFICATION_PASS,
      },
      defaultJobOptions: {
        removeOnComplete: true, // Remove job from the queue once it's completed
        attempts: 3, // Number of attempts before a job is marked as failed
        removeOnFail: {
          age: 200,
          count: 10,
        },
        backoff: {
          // Optional backoff settings for retrying failed jobs
          type: 'exponential',
          delay: 60000, // Initial delay of 1 min
        },
      },
    }),

    QueueModule.register({
      queues: [EmailQueues.APP_NOTIFICATION],
    }),
  ],
  controllers: [],
  providers: [WelcomeEmailNotificationProcessor],
})
export class WorkerModule {}
