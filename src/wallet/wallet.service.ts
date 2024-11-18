import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Client } from 'nestjs-soap';

@Injectable()
export class WalletService {
  constructor(
    @Inject('CUSTOMER_SOAP_CLIENT') private readonly mySoapClient: Client,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }
}
