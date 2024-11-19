import { UnprocessableEntityException, ValidationError } from '@nestjs/common';

export interface ErrorValidation {
  field: string;
  constraints: string[];
}

export class ValidationPipeFailedException extends UnprocessableEntityException {
  errors: ErrorValidation[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = this.formatErrors(errors);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map((error: ValidationError) => ({
      field: error.property,
      constraints: Object.values(error.constraints),
    }));
  }
}
