import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { WALLET_SOAP_CLIENT_NAME } from 'src/constants';
import { GetBalanceWalletDto } from './dto/get-balance-wallet.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { MakePaymentWalletDto } from './dto/make-payment-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confirm-payment-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_SOAP_CLIENT_NAME) private readonly soapClient: Client,
  ) {}

  async getBalance(getBalance: GetBalanceWalletDto) {
    const [response] = await this.soapClient.getWalletBalanceAsync(getBalance);
    return response;
  }

  async rechargeWallet(recharge: RechargeWalletDto) {
    const [response] = await this.soapClient.rechargeWalletAsync(recharge);
    return response;
  }

  async makePayment(payment: MakePaymentWalletDto) {
    const [response] =
      await this.soapClient.makePaymentWithWalletAsync(payment);
    return response;
  }

  async confirmPayment(confirmPayment: ConfirmPaymentWalletDto) {
    const [response] =
      await this.soapClient.confirmPaymentWithWalletAsync(confirmPayment);
    return response;
  }
}
