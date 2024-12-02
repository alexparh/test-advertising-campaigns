import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignReports } from '../../entities/cmpaignReports.entity';
import { AggregatedReportsPaginationDto } from './dto/aggregateEventData.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CampaignReports)
    private campaignReportRepository: Repository<CampaignReports>,
  ) {}

  async getAggregatedData(
    aggregatedReportsData: AggregatedReportsPaginationDto,
  ) {
    const { from_date, to_date, event_name, take, skip } =
      aggregatedReportsData;

    return this.campaignReportRepository.query(
      `
      SELECT campaign, campaign_id, adgroup, adgroup_id, ad, ad_id, event_name, COUNT(*) as event_count FROM campaign_reports
      WHERE event_name = $1 and event_time between $2 and $3
      GROUP BY ad_id, event_name, campaign, campaign_id, adgroup, adgroup_id, ad
      ORDER BY event_count DESC
      LIMIT $4 OFFSET $5;
      `,
      [event_name, from_date, to_date, take, skip],
    );
  }
}
