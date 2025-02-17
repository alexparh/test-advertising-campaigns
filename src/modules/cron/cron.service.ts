import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueueService } from '../queue/queue.service';
import { getStartAndEndOfCurrentDay } from 'src/utils/date';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(@Inject(QueueService) private queueService: QueueService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getProbabitionApiData() {
    try {
      const { startOfDay, endOfDay } = getStartAndEndOfCurrentDay();

      await this.queueService.addFetchTask(
        {
          from_date: startOfDay,
          to_date: endOfDay,
        },
        1,
      );
    } catch (error) {
      this.logger.error({
        message: 'Error while adding fetch cron to queue',
        error,
      });
    }
  }
}
