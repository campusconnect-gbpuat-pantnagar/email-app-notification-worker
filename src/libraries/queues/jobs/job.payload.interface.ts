import { QueueEventJobPattern } from './job.pattern';

export interface WelcomeEmailJob {
  pattern: QueueEventJobPattern.WELCOME_EMAIL;
  data: {
    email: string;
    name: string;
  };
}
