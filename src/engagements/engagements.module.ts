import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EngagementEntity } from './engagement.entity';
import { EngagementsService } from './engagements.service';
import { ContactsModule } from '../contacts/contacts.module';
import { EngagementsController } from './engagements.controller';
import { SnsModule } from '../core/sns/sns.module';
import { BullConfigService } from '../config/bull-config.service';
import { EngagementProcessor } from './engagement.processor';
import { BusinessesModule } from '../businesses/businesses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EngagementEntity]),
    BullModule.registerQueueAsync({
      name: 'engagement',
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: BullConfigService,
    }),
    BusinessesModule,
    ContactsModule,
    SnsModule,
  ],
  exports: [EngagementsService],
  providers: [EngagementsService, EngagementProcessor],
  controllers: [EngagementsController],
})
export class EngagementsModule {}
