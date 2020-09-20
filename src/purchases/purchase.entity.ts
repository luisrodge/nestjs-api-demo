import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as moment from 'moment';

import { BusinessEntity } from '../businesses/business.entity';
import { BundleEntity } from '../bundles/bundle.entity';

@Entity({ name: 'purchases' })
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => BusinessEntity,
    business => business.purchases,
  )
  business: BundleEntity;

  @ManyToOne(
    type => BundleEntity,
    bundle => bundle.purchases,
  )
  bundle: BundleEntity;

  @Column({ nullable: false, default: 0 })
  spentCredits: number;

  @Column({ nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setExpiresAt() {
    this.expiresAt = moment()
      .add(30, 'days')
      .toDate();
  }
}
