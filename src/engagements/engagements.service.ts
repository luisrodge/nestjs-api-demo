import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { EngagementEntity } from './engagement.entity';
import { ContactsService } from '../contacts/contacts.service';
import { ContactEntity } from '../contacts/contact.entity';
import { SnsService } from '../core/sns/sns.service';

@Injectable()
export class EngagementsService {
  constructor(
    @InjectRepository(EngagementEntity)
    private readonly engagementRepo: Repository<EngagementEntity>,
    private contactsService: ContactsService,
    private snsService: SnsService,
    private connection: Connection,
  ) {}

  async findById(
    id: number,
    relations?: string[],
  ): Promise<EngagementEntity | undefined> {
    return await this.engagementRepo.findOne({
      where: { id },
      relations,
    });
  }

  async findAll(): Promise<EngagementEntity[]> {
    return await this.engagementRepo.find({ order: { createdAt: 'DESC' } });
  }

  async create(values: Record<string, any>): Promise<EngagementEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let contacts: ContactEntity[];
      const phoneNumbers: string[] = [];

      const { contactIds, ...createValues } = values;

      if (contactIds) {
        contacts = await this.contactsService.findByIds(contactIds);
      } else {
        contacts = await this.contactsService.findAll();
      }

      for (const contact of contacts) {
        phoneNumbers.push(contact.phoneNumber);
      }

      const engagement = this.engagementRepo.create({
        ...createValues,
        contacts,
      });

      await queryRunner.manager.save(engagement);

      await this.snsService.sendSms(engagement.message, phoneNumbers);

      await queryRunner.commitTransaction();

      return engagement;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
