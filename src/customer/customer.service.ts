import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CUSTOMER_SOAP_CLIENT_NAME } from 'src/constants';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_SOAP_CLIENT_NAME) private readonly soapClient: Client,
  ) {}

  /**
   * Create a new customer by forwarding the request to the SOAP service.
   * Uses the SOAP client's `registerCustomer` but asynchronously, adding "Async" to the final method name.
   * For more details, refer to the documentation: https://www.npmjs.com/package/soap#clientmethodasyncargs-options---call-method-on-the-soap-service
   *
   */
  async create(customerDto: CreateCustomerDto) {
    const [response] = await this.soapClient.registerCustomerAsync(customerDto);
    return response;
  }
}
