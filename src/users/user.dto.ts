import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export abstract class CrudUserDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @Type(() => String)
  password: string;
}

export class CreateUserDto extends CrudUserDto {}

export class ResultUserDto {
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
  @Type(() => Boolean)
  readonly trial: boolean;
}
