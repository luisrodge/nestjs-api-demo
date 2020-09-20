import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BundleEntity } from './bundle.entity';
import { BundlesService } from './bundles.service';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [TypeOrmModule.forFeature([BundleEntity]), PurchasesModule],
  exports: [BundlesService],
  providers: [BundlesService],
})
export class BundlesModule {}
