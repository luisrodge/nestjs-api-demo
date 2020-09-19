import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BundleEntity } from './bundle.entity';

@Injectable()
export class BundlesService {
  constructor(
    @InjectRepository(BundleEntity)
    private readonly bundleRepo: Repository<BundleEntity>,
  ) {}

  async findBusinessBundles(
    businessId: number,
  ): Promise<BundleEntity[] | undefined> {
    const bundles = await this.bundleRepo
      .createQueryBuilder('bundle')
      .leftJoin('bundle.businesses', 'business')
      .where('business.id = :businessId', { businessId })
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
