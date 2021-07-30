import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BusinessEntity } from './business.entity';
import { BusinessesService } from './businesses.service';
import { BusinessController } from './businesses.controller';
import { BundlesModule } from '../bundles/bundles.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity]), BundlesModule],
  controllers: [BusinessController],
  exports: [BusinessesService],
  providers: [BusinessesService],
})
export class BusinessesModule {}
