import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BusinessEntity } from './business.entity';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepo: Repository<BusinessEntity>,
  ) {}

  async findById(
    id: number,
    relations?: string[],
  ): Promise<BusinessEntity | undefined> {
    return await this.businessRepo.findOne({
      where: { id },
      relations,
    });
  }
}
