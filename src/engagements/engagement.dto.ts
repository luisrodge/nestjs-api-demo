import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

import { TransformTimestamp } from '../core/decorators/transform-timestamp.decorator';
import {
  MIN_SNS_MESSAGE_LENGTH,
  MAX_SNS_MESSAGE_LENGTH,
} from '../shared/constants';

export abstract class CrudEngagementDto {
  @IsNotEmpty()
  @Type(() => String)
  title: string;

  @IsNotEmpty()
  @Length(MIN_SNS_MESSAGE_LENGTH, MAX_SNS_MESSAGE_LENGTH)
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
  readonly title: string;

  @Expose()
  @Type(() => String)
  readonly message: string;

  @Expose()
  @Type(() => String)
  readonly status: string;

  @Expose()
  @TransformTimestamp()
  readonly createdAt: Date;
}
