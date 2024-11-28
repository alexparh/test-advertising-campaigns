import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CampaignReports } from 'src/entities/cmpaignReports.entity';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [ReportsController],
  imports: [TypeOrmModule.forFeature([CampaignReports]), QueueModule],
  providers: [ReportsService],
})
export class ReportsModule {}
