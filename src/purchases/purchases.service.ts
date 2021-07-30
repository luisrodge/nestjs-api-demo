import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { PurchaseEntity } from './purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepo: Repository<PurchaseEntity>,
  ) {}

  async findById(
    id: number,
    relations?: string[],
  ): Promise<PurchaseEntity | undefined> {
    return await this.purchaseRepo.findOne({
      where: { id },
      relations,
    });
  }

  async findBusinessPurchases(
    businessId: number,
  ): Promise<PurchaseEntity[] | undefined> {
    return await this.purchaseRepo
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.bundle', 'bundle')
      .where('purchase."businessId" = :businessId', { businessId })
      .orderBy('purchase."createdAt"', 'DESC')
      .getMany();
  }

  async create(
    values: Record<string, any>,
    businessId: number,
  ): Promise<PurchaseEntity> {
    const newPurchase = this.purchaseRepo.create({
      ...values,
      businessId,
    });

    const purchase = await this.purchaseRepo.save(newPurchase);

    return await this.findById(purchase.id, ['bundle']);
  }

  async delete(id: number): Promise<PurchaseEntity> {
    const purchase = await this.findById(id);

    if (purchase.spentCredits != 0)
      throw new BadRequestException('Unable to cancel purchase. Credits used.');

    await this.purchaseRepo.delete(id);

    return purchase;
  }
}
