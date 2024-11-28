import { ApiProperty } from '@nestjs/swagger';

export class InitiateFetchDto {
  @ApiProperty()
  from_date: Date;

  @ApiProperty()
  to_date: Date;
}
