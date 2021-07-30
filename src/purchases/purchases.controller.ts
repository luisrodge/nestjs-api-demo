import { Body, Delete, Get, Param, Post } from '@nestjs/common';

import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ResultPurchaseDto, CreatePurchaseDto } from './purchase.dto';
import { PurchasesService } from './purchases.service';

@ApiController('/api/v1/purchases', ResultPurchaseDto)
export class PurchasesController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private purchasesService: PurchasesService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity) {
    return await this.purchasesService.findBusinessPurchases(
      currentUser.businessId,
    );
  }

  @Post()
  async create(
    @CurrentUser() currentUser: UserEntity,
    @Body() data: Record<string, any>,
  ) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreatePurchaseDto,
      data,
    );
    return await this.purchasesService.create(dto, currentUser.businessId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.purchasesService.delete(id);
  }
}
