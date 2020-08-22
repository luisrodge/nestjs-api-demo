import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class CrudEngagementDto {
  @IsNotEmpty()
  @Type(() => String)
  message: string;

  @IsOptional()
  @Type(() => Number)
  contactIds: number[];
}

export class CreateEngagementDto extends CrudEngagementDto {}
export class UpdateEngagementDto extends CrudEngagementDto {}

export class ResultEngagementDto {
  @Expose()
  @Type(() => Number)
  readonly id: number;

  @Expose()
  @Type(() => String)
  readonly message: string;
}
