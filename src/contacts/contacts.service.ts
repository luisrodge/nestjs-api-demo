import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as fs from 'fs-extra';
import * as csv from 'fast-csv';

import { ContactEntity } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepo: Repository<ContactEntity>,
  ) {}

  async findById(
    id: number,
    relations?: string[],
  ): Promise<ContactEntity | undefined> {
    return await this.contactRepo.findOne({
      where: { id },
      relations,
    });
  }

  async findByIds(ids: number[]): Promise<ContactEntity[] | undefined> {
    return await this.contactRepo.findByIds(ids);
  }

  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<ContactEntity | undefined> {
    return await this.contactRepo.findOne({ where: { phoneNumber } });
  }

  async findAll(businessId: number): Promise<ContactEntity[]> {
    return await this.contactRepo.find({
      where: { businessId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(
    values: Record<string, any>,
    businessId: number,
  ): Promise<ContactEntity> {
    const dbContact = await this.findByPhoneNumber(values.phoneNumber);

    if (dbContact) return;

    const contact = this.contactRepo.create({
      ...values,
      businessId,
    });

    return await this.contactRepo.save(contact);
  }

  async update(
    values: Record<string, any>,
    contactId: number,
  ): Promise<ContactEntity> {
    await this.contactRepo.update({ id: contactId }, values);

    return await this.findById(contactId);
  }

  async import(filePath: string, businessId: number) {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        await this.create(
          {
            name: row.Name,
            email: row.Email,
            phoneNumber: row.Phone,
          },
          businessId,
        );
      })
      .on('end', async () => {
        await fs.remove(filePath);
      });
  }

  async delete(
    id: number | Array<number> | string | Array<string>,
  ): Promise<DeleteResult> {
    return await this.contactRepo.delete(id);
  }
}
