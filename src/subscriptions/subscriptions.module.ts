import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionController } from './subscriptions.controller';
import { BusinessesModule } from '../businesses/businesses.module';

@Module({
  controllers: [SubscriptionController],
  imports: [TypeOrmModule.forFeature([SubscriptionEntity]), BusinessesModule],
  exports: [SubscriptionsService],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
