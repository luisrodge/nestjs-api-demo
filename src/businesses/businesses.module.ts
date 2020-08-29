import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BusinessEntity } from './business.entity';
import { BusinessesService } from './businesses.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  exports: [BusinessesService],
  providers: [BusinessesService],
})
export class BusinessesModule {}
