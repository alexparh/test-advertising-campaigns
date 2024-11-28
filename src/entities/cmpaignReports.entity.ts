import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('campaign_reports')
// @Unique('campaign_reports_unique_constraint', [
//   'event_time',
//   'client_id',
//   'event_name',
// ])
export class CampaignReports extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  campaign: string;

  @Column('int')
  campaign_id: number;

  @Column('varchar')
  adgroup: string;

  @Column('int')
  adgroup_id: number;

  @Column('varchar')
  ad: string;

  @Column('int')
  ad_id: number;

  @Column('int')
  client_id: number;

  @Column('varchar')
  event_name: string;

  @Column('int')
  event_time: Date;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;
}
