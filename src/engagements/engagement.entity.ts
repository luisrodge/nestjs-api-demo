import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ContactEntity } from '../contacts/contact.entity';
import { BusinessEntity } from '../businesses/business.entity';

@Entity({ name: 'engagements' })
export class EngagementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false, default: 'In Progress' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => ContactEntity)
  @JoinTable({
    name: 'engagement_contacts',
    joinColumn: {
      name: 'engagementId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'contactId',
      referencedColumnName: 'id',
    },
  })
  contacts: ContactEntity[];

  @Column({ nullable: false })
  businessId: number;

  @ManyToOne(
    type => BusinessEntity,
    business => business.engagements,
  )
  business: BusinessEntity;
}
