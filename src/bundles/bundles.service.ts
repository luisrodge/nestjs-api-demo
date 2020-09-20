import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from '../businesses/business.entity';
import { Repository } from 'typeorm';

import { BundleEntity } from './bundle.entity';

@Injectable()
export class BundlesService {
  constructor(
    @InjectRepository(BundleEntity)
    private readonly bundleRepo: Repository<BundleEntity>,
  ) {}

  async findPurchasedBundles(
    businessId: number,
  ): Promise<BundleEntity[] | undefined> {
    const bundles = await this.bundleRepo
      .createQueryBuilder('bundle')
      .innerJoin('bundle.purchases', 'purchase')
      .innerJoin('purchase.business', 'business', 'business.id = :businessId', {
        businessId,
      })
      .getMany();

    return bundles;
  }

  async remainingCredits(id: number): Promise<number> {
    // const business = await this.businessRepo.findOne({
    //   where: { id },
    //   relations: ['subscription'],
    // });

    // const credits =
    //   business.subscription.credits +
    //   business.rolloverCredits -
    //   business.spentCredits;

    return 0;
  }
}
