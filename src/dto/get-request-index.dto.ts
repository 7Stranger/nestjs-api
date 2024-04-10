import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class GetRequestIndexDto {
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  requestIndex: number;
}
