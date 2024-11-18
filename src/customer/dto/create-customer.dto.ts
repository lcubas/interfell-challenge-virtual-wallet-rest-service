import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  documentNumber: string;
}
