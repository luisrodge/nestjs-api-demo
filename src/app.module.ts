import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { configService } from './config/config.service';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { EngagementsModule } from './engagements/engagements.module';
import { SnsModule } from './core/sns/sns.module';
import { BusinessesModule } from './businesses/businesses.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { BundlesModule } from './bundles/bundles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    BusinessesModule,
    ContactsModule,
    EngagementsModule,
    ProfilesModule,
    SnsModule,
    UsersModule,
    SubscriptionsModule,
    BundlesModule,
  ],
})
export class AppModule {}
