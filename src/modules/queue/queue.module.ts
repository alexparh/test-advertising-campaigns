import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';

@Module({
  providers: [QueueService],
  imports: [
    BullModule.registerQueue({
      name: 'fetchQueue',
      processors: [
        { path: join(__dirname, 'processor.js'), useWorkerThreads: true },
      ],
    }),
  ],
  exports: [QueueService],
})
export class QueueModule {}
