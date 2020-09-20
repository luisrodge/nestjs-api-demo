import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseEntity } from './purchase.entity';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseEntity])],
  exports: [PurchasesService],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
