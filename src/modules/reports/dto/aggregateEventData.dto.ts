import { ApiProperty } from '@nestjs/swagger';

export class AggregateEventDataDto {
  @ApiProperty()
  from_date: Date;

  @ApiProperty()
  to_date: Date;

  @ApiProperty()
  event_name: string;

  @ApiProperty()
  take: number;
}
