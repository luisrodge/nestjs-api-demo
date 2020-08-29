import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { ResultBusinessDto } from './business.dto';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { BusinessesService } from './businesses.service';

@ApiController('/api/v1/businesses', ResultBusinessDto)
export class BusinessesController {
  constructor(private businessesService: BusinessesService) {}

  @Get('profile')
  public async findOne(@CurrentUser() currentUser: UserEntity) {
    return await this.businessesService.findById(currentUser.businessId);
  }
}
