import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InitiateFetchDto } from './dto/initiateFetch.dto';
import { AggregatedReportsDto } from './dto/aggregateEventData.dto';
import { QueueService } from '../queue/queue.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private queueService: QueueService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get aggregated event data' })
  @ApiResponse({
    status: 200,
    description: 'Aggregated event data retrieved successfully',
    schema: {
      example: {
        data: [
          {
            ad_id: 123,
            event_date: '2024-01-01',
            event_count: 15,
          },
        ],
        page: 1,
        take: 10,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error occurred',
    schema: {
      example: {
        statusCode: 400,
        message: ['string'],
        error: 'Bad Request',
      },
    },
  })
  async aggregateEventData(
    @Query() aggregatedReportsDataPage: AggregatedReportsDto,
  ) {
    const { page, ...aggregatedReportsData } = aggregatedReportsDataPage;

    const { take } = aggregatedReportsData;
    const skip = (page - 1) * take;

    const data = await this.reportsService.getAggregatedData({
      skip,
      ...aggregatedReportsData,
    });

    return { data, page, take };
  }

  @Post()
  @ApiOperation({ summary: 'Initiate fetch task' })
  @ApiResponse({
    status: 200,
    description: 'Fetch request has been successfully queued',
    schema: {
      example: {
        ok: 'string',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error occurred',
    schema: {
      example: {
        statusCode: 400,
        message: ['string'],
        error: 'Bad Request',
      },
    },
  })
  async initiateFetch(@Body() initiateFetch: InitiateFetchDto) {
    await this.queueService.addFetchTask(
      { is_user_initiated: true, ...initiateFetch },
      2,
    );

    return { ok: 'Fetch request has been successfully queued' };
  }
}
