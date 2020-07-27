import {
  ArgumentMetadata,
  Optional,
  Type,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export class DtoValidationPipe extends ValidationPipe {
  constructor(@Optional() options?: ValidationPipeOptions) {
    super(options);
  }

  public async transformToDto(dtoType: Type<any>, value: any) {
    const metadata: ArgumentMetadata = { metatype: dtoType, type: 'body' };

    return this.transform(value, metadata);
  }
}
