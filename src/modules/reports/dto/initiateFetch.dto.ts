import { ApiProperty } from '@nestjs/swagger';

export class InitiateFetchDto {
  @ApiProperty()
  from_date: string;

  @ApiProperty()
  to_date: string;
}
