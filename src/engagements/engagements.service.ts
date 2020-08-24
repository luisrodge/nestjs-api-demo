import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    try {
      let contacts: ContactEntity[];

      const { contactIds, ...createValues } = values;

      if (contactIds) {
        contacts = await this.contactsService.findByIds(contactIds);
      } else {
        contacts = await this.contactsService.findAll();
      }

      const engagementValues = this.engagementRepo.create({
        ...createValues,
        contacts,
        status: 'Completed',
      });

      const engagement = await this.engagementRepo.save(engagementValues);

      await this.snsService.sendSms(engagement.message, ['']);

      return engagement;
    } catch (error) {
      throw error;
    }
  }
}
