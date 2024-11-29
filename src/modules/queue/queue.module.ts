import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fetchQueue',
      processors: [
        {
          path: require('url').pathToFileURL(
            join(process.cwd(), 'processor.js'),
          ),
          useWorkerThreads: true,
        },
      ],
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
