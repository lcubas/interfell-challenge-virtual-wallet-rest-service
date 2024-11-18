import { IsNotEmpty, IsPositive } from 'class-validator';
import { CustomerDataWalletDto } from './customer-data-wallet.dto';

export class MakePaymentWalletDto extends CustomerDataWalletDto {
  @IsNotEmpty()
  @IsPositive()
  purchaseAmount: number;
}
