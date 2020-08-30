import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubscriptionEntity } from './subscription.entity';
import { BusinessesService } from '../businesses/businesses.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepo: Repository<SubscriptionEntity>,
    private businessesService: BusinessesService,
  ) {}

  async findById(
    id: number,
    relations?: string[],
  ): Promise<SubscriptionEntity | undefined> {
    return await this.subscriptionRepo.findOne({
      where: { id },
      relations,
    });
  }

  async findByBusinessId(
    businessId: number,
  ): Promise<SubscriptionEntity | undefined> {
    const business = await this.businessesService.findById(businessId, [
      'subscription',
    ]);

    return business.subscription;
  }
}
