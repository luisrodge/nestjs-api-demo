import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { SubscriptionsService } from './subscriptions.service';
import { ResultSubscriptionDto } from './subscription.dto';

@ApiController('/api/v1/subscription', ResultSubscriptionDto)
export class SubscriptionController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get()
  public async findOne(@CurrentUser() currentUser: UserEntity) {
    return await this.subscriptionsService.findByBusinessId(
      currentUser.businessId,
    );
  }
}
