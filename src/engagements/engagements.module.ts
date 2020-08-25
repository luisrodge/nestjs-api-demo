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

@Module({
  imports: [
    TypeOrmModule.forFeature([EngagementEntity]),
    BullModule.registerQueueAsync({
      name: 'engagement',
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: BullConfigService,
    }),
    ContactsModule,
    SnsModule,
  ],
  exports: [EngagementsService],
  providers: [EngagementsService],
  controllers: [EngagementsController],
})
export class EngagementsModule {}
