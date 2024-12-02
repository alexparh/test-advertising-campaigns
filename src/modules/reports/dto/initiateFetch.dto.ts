import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InitiateFetchDto {
  @ApiProperty({
    description: 'Start date (format: YYYY-MM-DD HH:MM:SS)',
    example: '2024-11-28 00:00:00',
  })
  @IsString()
  from_date: string;

  @ApiProperty({
    description: 'End date (format: YYYY-MM-DD HH:MM:SS)',
    example: '2024-11-28 15:59:59',
  })
  @IsString()
  to_date: string;
}
