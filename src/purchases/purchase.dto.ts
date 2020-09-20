import { Type, Expose } from 'class-transformer';

import { ResultBundleDto } from '../bundles/bundle.dto';
import { TransformHumanDate } from '../core/decorators/transform-date.decorator ';

export class ResultPurchaseDto {
  @Expose()
  @Type(() => Number)
  readonly id: number;

  @Expose()
  @Type(() => Number)
  readonly spentCredits: number;

  @Expose()
  @TransformHumanDate()
  readonly expiresAt: Date;

  @Expose()
  @Type(() => ResultBundleDto)
  readonly bundle: ResultBundleDto;
}
