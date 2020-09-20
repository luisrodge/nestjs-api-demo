import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { BundlesService } from '../bundles/bundles.service';
import { ResultBundleDto } from './bundle.dto';

@ApiController('/api/v1/business/bundles', ResultBundleDto)
export class BundlesController {
  constructor(private bundlesService: BundlesService) {}

  @Get()
  public async findAll(@CurrentUser() currentUser: UserEntity) {
    return await this.bundlesService.findPurchasedBundles(
      currentUser.businessId,
    );
  }
}
