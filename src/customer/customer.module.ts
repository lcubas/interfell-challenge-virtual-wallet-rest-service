import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerSoapConfigService } from './customer-soap-config.service';
import { SoapModule } from 'nestjs-soap';
import { ConfigModule } from '@nestjs/config';
import { CUSTOMER_SOAP_CLIENT_NAME } from 'src/constants';

@Module({
  imports: [
    SoapModule.forRootAsync({
      imports: [ConfigModule],
      clientName: CUSTOMER_SOAP_CLIENT_NAME,
      useClass: CustomerSoapConfigService,
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
