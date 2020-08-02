import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactEntity } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
})
export class ContactsModule {}
