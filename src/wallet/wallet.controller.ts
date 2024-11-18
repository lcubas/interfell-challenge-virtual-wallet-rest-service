import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetBalanceWalletDto } from './dto/get-balance-wallet.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { MakePaymentWalletDto } from './dto/make-payment-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confirm-payment-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('balance')
  @HttpCode(200)
  getBalanceWallet(@Body() getBalanceDto: GetBalanceWalletDto) {
    return this.walletService.getBalance(getBalanceDto);
  }

  @Post('recharge')
  @HttpCode(200)
  recharheWallet(@Body() rechargeDto: RechargeWalletDto) {
    return this.walletService.rechargeWallet(rechargeDto);
  }

  @Post('payment')
  @HttpCode(201)
  makePayment(@Body() paymentDto: MakePaymentWalletDto) {
    return this.walletService.makePayment(paymentDto);
  }

  @Post('confirm-payment')
  @HttpCode(200)
  confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentWalletDto) {
    return this.walletService.confirmPayment(confirmPaymentDto);
  }
}
