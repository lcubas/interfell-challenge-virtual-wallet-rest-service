import { Module } from '@nestjs/common';
import { SoapModule } from 'nestjs-soap';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletSoapConfigService } from './wallet-soap-config.service';
import { ConfigModule } from '@nestjs/config';
import { WALLET_SOAP_CLIENT_NAME } from 'src/constants';

@Module({
  imports: [
    SoapModule.forRootAsync({
      imports: [ConfigModule],
      clientName: WALLET_SOAP_CLIENT_NAME,
      useClass: WalletSoapConfigService,
    }),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
