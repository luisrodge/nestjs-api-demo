import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
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
  rolloverCredits: number;

  @Column({ nullable: false, default: 0 })
  spentCredits: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
