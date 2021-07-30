import { Type, Expose } from 'class-transformer';

export class ResultBundleDto {
  @Expose()
  @Type(() => Number)
  readonly id: number;

  @Expose()
  @Type(() => Number)
  readonly credits: number;

  @Expose()
  @Type(() => Number)
  readonly price: number;
}
