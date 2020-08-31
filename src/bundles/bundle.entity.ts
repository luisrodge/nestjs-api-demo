import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
