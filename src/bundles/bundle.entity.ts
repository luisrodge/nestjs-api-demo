import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PurchaseEntity } from '../purchases/purchase.entity';

@Entity({ name: 'bundles' })
export class BundleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  credits: number;

  @Column({ nullable: true })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => PurchaseEntity,
    purchase => purchase.bundle,
  )
  purchases: PurchaseEntity[];
}
