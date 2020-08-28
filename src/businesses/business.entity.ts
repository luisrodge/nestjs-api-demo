import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Entity({ name: 'businesses' })
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  businessId: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => UserEntity,
    user => user.business,
  )
  users: UserEntity[];
}
