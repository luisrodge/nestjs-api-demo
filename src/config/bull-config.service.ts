import { Injectable } from '@nestjs/common';
import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

const REDIS_HOST_ENV_VARIABLE = 'REDIS_HOST';
const REDIS_PORT_ENV_VARIABLE = 'REDIS_PORT';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get<string>(REDIS_HOST_ENV_VARIABLE),
        port: this.configService.get<number>(REDIS_PORT_ENV_VARIABLE),
      },
    };
  }
}
