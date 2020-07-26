import { Get } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { ResultUserDto } from '../users/user.dto';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';

@ApiController('/api/v1/profile', ResultUserDto)
export class ProfilesController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private usersService: UsersService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @Get()
  public async findOne(@CurrentUser() currentUser: UserEntity) {
    return await this.usersService.findById(currentUser.id, ['pictures']);
  }
}
