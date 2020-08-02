import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ContactsModule,
    ProfilesModule,
    UsersModule,
  ],
})
export class AppModule {}
