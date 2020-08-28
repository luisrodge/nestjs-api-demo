import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ContactEntity } from '../contacts/contact.entity';

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
}
