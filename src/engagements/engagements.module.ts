import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngagementEntity } from './engagement.entity';
import { EngagementsService } from './engagements.service';
import { ContactsModule } from '../contacts/contacts.module';
import { EngagementsController } from './engagements.controller';
import { SnsModule } from '../core/sns/sns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EngagementEntity]),
    ContactsModule,
    SnsModule,
  ],
  exports: [EngagementsService],
  providers: [EngagementsService],
  controllers: [EngagementsController],
})
export class EngagementsModule {}
