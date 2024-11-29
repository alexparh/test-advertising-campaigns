export class AddFetchTaskDto {
  from_date: string;

  to_date: string;

  is_user_initiated?: boolean = false;
}
