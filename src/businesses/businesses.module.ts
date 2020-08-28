import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BusinessEntity } from './business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
})
export class BusinessesModule {}
