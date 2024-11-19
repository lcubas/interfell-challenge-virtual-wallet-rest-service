import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  ErrorValidation,
  ValidationPipeFailedException,
} from 'src/exceptions/validation-pipe-failed.exception';

interface ApiErrorResponse {
  code: number;
  success: boolean;
  message: string;
  stack?: string;
  errors?: ErrorValidation[];
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
    };

    if (exception instanceof Error) {
      responseBody.message = exception.message;
    }

    if (exception instanceof ValidationPipeFailedException) {
      responseBody.errors = exception.errors;
    }

    if (process.env.NODE_ENV === 'development' && exception instanceof Error) {
      responseBody.stack = exception.stack ?? null;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, code);
  }
}
