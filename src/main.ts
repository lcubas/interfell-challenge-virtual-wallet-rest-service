import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  // UnprocessableEntityException,
  // ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { ErrorCatchFilter } from './filters/error-catch/error-catch.filter';
import { ValidateDtoPipe } from './pipes/validation-dto.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  //   }),
  // );
  app.useGlobalPipes(new ValidateDtoPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorCatchFilter(httpAdapterHost));

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
