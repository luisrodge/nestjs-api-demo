import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BundleEntity } from './bundle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BundleEntity])],
})
export class BundlesModule {}
