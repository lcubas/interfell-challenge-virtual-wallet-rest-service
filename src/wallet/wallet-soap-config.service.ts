import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SoapModuleOptionsFactory,
  SoapModuleOptionsFactoryType,
} from 'nestjs-soap';

@Injectable()
export class WalletSoapConfigService implements SoapModuleOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  createSoapModuleOptions(): SoapModuleOptionsFactoryType {
    return {
      uri: this.configService.get<string>('WALLET_SOAP_URI'),
    };
  }
}
