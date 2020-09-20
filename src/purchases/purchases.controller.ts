import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ResultPurchaseDto } from './purchase.dto';
import { PurchasesService } from './purchases.service';

@ApiController('/api/v1/purchases', ResultPurchaseDto)
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get()
  public async findAll(@CurrentUser() currentUser: UserEntity) {
    return await this.purchasesService.findBusinessPurchases(
      currentUser.businessId,
    );
  }
}
