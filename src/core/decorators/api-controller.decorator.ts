import {
  applyDecorators,
  Controller,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';

import {
  DtoTransformInterceptor,
  DTO_TRANSFORM_OPTIONS,
} from '../interceptors/dto-transform.interceptor';

export function ApiController(
  prefix: string,
  dtoClass: any,
  authGuard: any = JwtAuthGuard,
) {
  return applyDecorators(
    Controller(prefix),
    SetMetadata(DTO_TRANSFORM_OPTIONS, {
      targetClass: dtoClass,
      classTransformOptions: { excludeExtraneousValues: true },
    }),
    UseGuards(authGuard),
    UseInterceptors(ResponseTransformInterceptor),
    UseInterceptors(DtoTransformInterceptor),
  );
}
