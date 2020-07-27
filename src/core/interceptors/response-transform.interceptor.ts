import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
  status: number;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const url = request.url;

    if (url.startsWith('/api/v1')) {
      return next.handle().pipe(
        map(data => {
          return {
            result: data,
            status: response.statusCode,
          };
        }),
      );
    } else {
      return next.handle().pipe(map(data => data));
    }
  }
}
