import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BundleEntity } from './bundle.entity';

@Injectable()
export class BundlesService {
  constructor(
    @InjectRepository(BundleEntity)
    private readonly bundleRepo: Repository<BundleEntity>,
  ) {}

  async remainingCredits(id: number): Promise<number> {
    return 0;
  }
}
