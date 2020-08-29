import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { ContactEntity } from '../contacts/contact.entity';
import { EngagementEntity } from '../engagements/engagement.entity';
import { SubscriptionEntity } from 'src/subscriptions/subscription.entity';

@Entity({ name: 'businesses' })
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  businessId: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
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

  @OneToMany(
    type => ContactEntity,
    contact => contact.business,
  )
  contacts: ContactEntity[];

  @OneToMany(
    type => EngagementEntity,
    engagement => engagement.business,
  )
  engagements: EngagementEntity[];

  @ManyToOne(
    type => SubscriptionEntity,
    subscription => subscription.businesses,
  )
  subscription: SubscriptionEntity;
}
