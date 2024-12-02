import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { AddFetchTaskDto } from './dto/addFetchTask.dto';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  constructor(@InjectQueue('fetchQueue') private fetchQueue: Queue) {}

  async addFetchTask(taskData: AddFetchTaskDto, priority: number) {
    const job = await this.fetchQueue.add('fetch-task', taskData, {
      priority,
      removeOnComplete: true,
    });

    this.logger.log({
      message: `${taskData.is_user_initiated ? 'User intiated' : 'Cron'} job queued`,
      id: job.id,
    });
  }
}
