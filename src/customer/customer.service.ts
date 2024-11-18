import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Client } from 'nestjs-soap';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_SOAP_CLIENT') private readonly mySoapClient: Client,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    await this.mySoapClient.registerCustomer(createCustomerDto);
  }
}
