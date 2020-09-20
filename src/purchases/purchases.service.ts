import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PurchaseEntity } from './purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepo: Repository<PurchaseEntity>,
  ) {}

  async findBusinessPurchases(
    businessId: number,
  ): Promise<PurchaseEntity[] | undefined> {
    return await this.purchaseRepo
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.bundle', 'bundle')
      .where('purchase."businessId" = :businessId', { businessId })
      .getMany();
  }
}
