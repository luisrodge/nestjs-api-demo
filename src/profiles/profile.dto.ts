import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}
