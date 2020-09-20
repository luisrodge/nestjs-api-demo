import { Type, Expose } from 'class-transformer';

import { ResultBundleDto } from '../bundles/bundle.dto';
import { TransformDate } from '../core/decorators/transform-date.decorator ';

export class ResultPurchaseDto {
  @Expose()
  @Type(() => Number)
  readonly id: number;

  @Expose()
  @Type(() => Number)
  readonly spentCredits: number;

  @Expose()
  @TransformDate()
  readonly expiresAt: number;

  @Expose()
  @Type(() => ResultBundleDto)
  readonly bundle: ResultBundleDto;
}
