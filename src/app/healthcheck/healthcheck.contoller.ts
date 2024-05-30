import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  constructor() {}

  @Get()
  healthcheck() {
    return 'EMAIL-APP-NOTIFICATION-WORKER SERVICE IS HEALTHY ✅ 🚀.';
  }
}
