import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerSoapConfigService } from './customer-soap-config.service';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [
    SoapModule.forRootAsync({
      clientName: 'CUSTOMER_SOAP_CLIENT',
      useClass: CustomerSoapConfigService,
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
