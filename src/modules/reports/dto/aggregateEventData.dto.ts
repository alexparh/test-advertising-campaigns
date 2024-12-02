import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsDate, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class AggregatedReportsDto {
  @ApiProperty({
    description: 'Start date (format: YYYY-MM-DD HH:MM:SS)',
    example: '2024-11-28 00:00:00',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  from_date: Date;

  @ApiProperty({
    description: 'End date (format: YYYY-MM-DD HH:MM:SS)',
    example: '2024-11-31 15:59:59',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  to_date: Date;

  @ApiProperty({
    description: 'Name of the event to filter by ("install", "purchase")',
    example: 'install',
  })
  @IsString()
  event_name: string;

  @ApiProperty({
    description: 'Number of records per page',
    example: 10,
    minimum: 1,
    maximum: 1000,
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @Max(1000)
  take: number;

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  page: number;
}

export class AggregatedReportsPaginationDto extends OmitType(
  AggregatedReportsDto,
  ['page'],
) {
  @IsInt()
  @Min(0)
  skip: number;
}
