import { IsNotEmpty, IsPositive } from 'class-validator';
import { CustomerDataWalletDto } from './customer-data-wallet.dto';

export class RechargeWalletDto extends CustomerDataWalletDto {
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
