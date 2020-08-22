import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export abstract class CrudContactDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;
}

export class CreateContactDto extends CrudContactDto {}
export class UpdateContactDto extends CrudContactDto {}

export class ResultContactDto {
  @Expose()
  @Type(() => Number)
  readonly id: number;

  @Expose()
  @Type(() => String)
  readonly name: string;

  @Expose()
  @Type(() => String)
  readonly email: string;

  @Expose()
  @Type(() => String)
  readonly phoneNumber: string;
}
