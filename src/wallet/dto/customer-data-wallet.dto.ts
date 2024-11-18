import { IsNotEmpty } from 'class-validator';

export class CustomerDataWalletDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  documentNumber: string;
}
