import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnsService } from './sns.service';

@Module({
  imports: [ConfigModule],
  exports: [SnsService],
  providers: [SnsService],
})
export class SnsModule {}
