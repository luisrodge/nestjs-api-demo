import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { ResultBusinessDto } from './business.dto';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { BusinessesService } from './businesses.service';

@ApiController('/api/v1/business', ResultBusinessDto)
export class BusinessController {
  constructor(private businessesService: BusinessesService) {}

  @Get()
  public async findOne(@CurrentUser() currentUser: UserEntity) {
    return await this.businessesService.findById(currentUser.businessId);
  }
}
