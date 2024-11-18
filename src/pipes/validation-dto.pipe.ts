import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateDtoPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        console.log('ValidateInputPipe', e.getResponse(), '\n');
        // eslint-disable-next-line prettier/prettier
        throw new UnprocessableEntityException(e);
      }
    }
  }

  private handleError(errors: any) {
    return errors.map((error: any) => error.constraints);
  }
}
