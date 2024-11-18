import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ApiErrorResponse {
  code: number;
  success: boolean;
  message: string;
  error?: Record<string, unknown>;
}

@Catch()
export class ErrorCatchFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ApiErrorResponse = {
      code,
      success: false,
      message: 'Internal Server Error',
      error: {
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      },
    };

    console.error(exception);

    if (exception instanceof Error) {
      responseBody.message = exception.message;
    }

    if (process.env.NODE_ENV === 'development' && exception instanceof Error) {
      responseBody.error.stack = exception.stack ?? null;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, code);
  }
}
