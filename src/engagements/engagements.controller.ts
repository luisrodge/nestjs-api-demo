import { Post, Body, Get } from '@nestjs/common';

import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { ResultEngagementDto, CreateEngagementDto } from './engagement.dto';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { EngagementsService } from './engagements.service';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';

@ApiController('/api/v1/engagements', ResultEngagementDto)
export class EngagementsController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private engagementsService: EngagementsService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity) {
    return await this.engagementsService.findAll();
  }

  @Post()
  async create(
    @Body() data: Record<string, any>,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreateEngagementDto,
      data,
    );
    return await this.engagementsService.create(dto, currentUser.businessId);
  }
}
