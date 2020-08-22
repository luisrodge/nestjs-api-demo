import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EngagementEntity } from './engagement.entity';
import { ContactsService } from '../contacts/contacts.service';
import { ContactEntity } from 'src/contacts/contact.entity';

@Injectable()
export class EngagementsService {
  constructor(
    @InjectRepository(EngagementEntity)
    private readonly engagementRepo: Repository<EngagementEntity>,
    private contactsService: ContactsService,
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
    let contacts: ContactEntity[];

    const { contactIds, ...createValues } = values;

    if (contactIds) {
      contacts = await this.contactsService.findByIds(contactIds);
    } else {
      contacts = await this.contactsService.findAll();
    }

    const engagement = this.engagementRepo.create({ ...createValues });
    engagement.contacts = contacts;

    return await this.engagementRepo.save(engagement);
  }
}
