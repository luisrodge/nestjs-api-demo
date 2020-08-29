import { Type, Expose } from 'class-transformer';

export class PartialResultBusinessDto {
  @Expose()
  @Type(() => String)
  readonly name: string;

  @Expose()
  @Type(() => String)
  readonly businessId: string;
}
