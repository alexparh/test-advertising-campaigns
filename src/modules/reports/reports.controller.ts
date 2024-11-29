import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InitiateFetchDto } from './dto/initiateFetch.dto';
import { AggregateEventDataDto } from './dto/aggregateEventData.dto';
import { QueueService } from '../queue/queue.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private queueService: QueueService,
  ) {}

  // @Get()
  // @ApiResponse({
  //   status: 200,
  //   type:
  // })
  // async aggregateEventData(@Body() aggregateEventData: AggregateEventDataDto) {

  // }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Fetch request has been successfully queued',
  })
  async initiateFetch(@Body() initiateFetch: InitiateFetchDto) {
    // date format: YYYY-MM-DD HH:00:00
    await this.queueService.addFetchTask(
      { is_user_initiated: true, ...initiateFetch },
      2,
    );

    return { ok: 'Fetch request has been successfully queued' };
  }
}
