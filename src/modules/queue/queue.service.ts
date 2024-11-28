import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { AddFetchTaskDto } from './dto/addFetchTask.dto';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('fetchQueue') private fetchQueue: Queue) {}

  async addFetchTask(taskData: AddFetchTaskDto, priority: number) {
    await this.fetchQueue.add('fetch-task', taskData, {
      priority,
      removeOnComplete: true,
    });
  }
}
