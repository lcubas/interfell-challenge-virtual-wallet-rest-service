import { IsNotEmpty } from 'class-validator';

export class ConfirmPaymentWalletDto {
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  token: string;
}
