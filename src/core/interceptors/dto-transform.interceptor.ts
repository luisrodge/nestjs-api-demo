import { classToPlain, plainToClass } from 'class-transformer';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { Reflector } from '@nestjs/core';

export interface PlainLiteralObject {
  [key: string]: any;
}

export const DTO_TRANSFORM_OPTIONS = 'dto_transform:option';
const REFLECTOR = 'Reflector';

export interface DtoTransformOptions {
  targetClass: Type<any>;
  classTransformOptions: ClassTransformOptions;
}

@Injectable()
export class DtoTransformInterceptor implements NestInterceptor {
  constructor(@Inject(REFLECTOR) protected readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.getContextOptions(context);

    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.serialize(res, options),
        ),
      );
  }

  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: DtoTransformOptions,
  ): PlainLiteralObject | PlainLiteralObject[] {
    const isArray = Array.isArray(response);

    if (!isObject(response) && !isArray) {
      return response;
    }

    if (isArray) {
      return (response as PlainLiteralObject[]).map(item =>
        this.transformToPlain(item, options),
      );
    } else {
      return this.transformToPlain(response, options);
    }
  }

  transformToPlain(
    plainOrClass: any,
    options: DtoTransformOptions,
  ): PlainLiteralObject {
    const classTransformOptions = options.classTransformOptions;

    if (plainOrClass && plainOrClass.constructor !== Object) {
      const targetClass = options.targetClass;

      if (targetClass) {
        const value = plainToClass(
          targetClass,
          plainOrClass,
          classTransformOptions,
        );

        return classToPlain(value, classTransformOptions);
      } else {
        return classToPlain(plainOrClass, classTransformOptions);
      }
    } else {
      return plainOrClass;
    }
  }

  private getContextOptions(context: ExecutionContext): DtoTransformOptions {
    return (
      this.reflectSerializeMetadata(context.getHandler()) ||
      this.reflectSerializeMetadata(context.getClass()) || {
        targetClass: null,
        classTransformOptions: {},
      }
    );
  }

  private reflectSerializeMetadata(
    obj: Type<any> | Function,
  ): DtoTransformOptions | undefined {
    return this.reflector.get(DTO_TRANSFORM_OPTIONS, obj);
  }
}
