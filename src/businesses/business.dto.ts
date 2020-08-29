import { Type, Expose } from 'class-transformer';

export class ResultBusinessDto {
  @Expose()
  @Type(() => String)
  readonly name: string;

  @Expose()
  @Type(() => String)
  readonly businessId: string;
}
