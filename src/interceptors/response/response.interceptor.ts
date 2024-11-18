import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const response: ApiResponse<T> = {
          success: true,
          code: Number(data.code),
          data: data.data ? JSON.parse(data.data) : {},
        };

        if (
          Number(data.code) !== HttpStatus.OK &&
          Number(data.code) !== HttpStatus.CREATED
        ) {
          throw new HttpException(data.message, Number(data.code));
        }

        return response;
      }),
    );
  }
}
