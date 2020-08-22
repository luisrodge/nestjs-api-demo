import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngagementEntity } from './engagement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EngagementEntity])],
})
export class EngagementsModule {}
