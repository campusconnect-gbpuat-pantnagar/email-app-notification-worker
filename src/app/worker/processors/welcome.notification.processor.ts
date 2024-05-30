import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { EmailQueues } from 'src/libraries/queues/queue.constants';
import { Job } from 'bullmq';
import {
  QueueEventJobPattern,
  WelcomeEmailJob,
} from 'src/libraries/queues/jobs';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Processor(EmailQueues.APP_NOTIFICATION, {
  concurrency: 100,
  useWorkerThreads: true,
})
@Injectable()
export class WelcomeEmailNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(WelcomeEmailNotificationProcessor.name);
  constructor(
    private _mailService: MailerService,
    private _configService: ConfigService,
  ) {
    super();
  }
  async process(
    job: Job<WelcomeEmailJob['data'], number, string>,
  ): Promise<void> {
    try {
      // we are getting the gbpuatEmail, name
      switch (job.name) {
        case QueueEventJobPattern.WELCOME_EMAIL:
          // ✅ TODO: sending welcome email to user
          await this.sendWelcomeEmail(job);
          break;
        default:
          break;
      }
    } catch (error) {
      this.logger.error(
        `Failed to process job ${job.id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async sendWelcomeEmail(job: Job<WelcomeEmailJob['data']>) {
    // send welcome email  to user
    const { email, name } = job.data;
    console.log(job.data);
    const context = {
      name: name.toUpperCase(),
    };
    await this._mailService.sendMail({
      to: email,
      from: `CampusConnect ${this._configService.get<string>('SMTP_SERVICE_EMAIL')}`,
      subject: `Welcome to CampusConnect - Your Ultimate  Social Network For College Community!`,
      template: 'welcome.ejs',
      context,
    });
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job<WelcomeEmailJob['data']>) {
    const { id, name, queueName, finishedOn } = job;
    const completionTime = finishedOn ? new Date(finishedOn).toISOString() : '';
    this.logger.debug(
      `welcome email send Successfully to ${job.data.email} ${job.data.name} `,
    );
    this.logger.log(
      `Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}.`,
    );
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    const { id, name, progress } = job;
    this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    const { id, name, queueName, failedReason } = job;
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
    );
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : '';
    this.logger.log(
      `Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`,
    );
  }
}
