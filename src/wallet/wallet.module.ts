import { Module } from '@nestjs/common';
import { SoapModule } from 'nestjs-soap';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletSoapConfigService } from './wallet-soap-config.service';

@Module({
  imports: [
    SoapModule.forRootAsync({
      clientName: 'MY_SOAP_CLIENT',
      useClass: WalletSoapConfigService,
    }),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
