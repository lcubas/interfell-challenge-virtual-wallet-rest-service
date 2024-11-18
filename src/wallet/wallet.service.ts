import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WALLET_SOAP_CLIENT_NAME } from 'src/constants';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_SOAP_CLIENT_NAME) private readonly soapClient: Client,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    console.log('createWalletDto', createWalletDto);
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }
}
