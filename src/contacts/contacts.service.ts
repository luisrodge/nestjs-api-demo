import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as fs from 'fs';
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

  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<ContactEntity | undefined> {
    return await this.contactRepo.findOne({ where: { phoneNumber } });
  }

  async findAll(): Promise<ContactEntity[]> {
    return await this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }

  async create(
    values: Record<string, any>,
    userId: number,
  ): Promise<ContactEntity> {
    const dbContact = await this.findByPhoneNumber(values.phoneNumber);

    if (dbContact) return;

    const contact: ContactEntity = this.contactRepo.create({
      ...values,
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

  async import(filePath: string) {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', async row => {
        const contact = {
          name: row.Name,
          email: row.Email,
          phoneNumber: row.Phone,
        };
        await this.create(contact, 1);
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
      });
  }

  async delete(
    id: number | Array<number> | string | Array<string>,
  ): Promise<DeleteResult> {
    return await this.contactRepo.delete(id);
  }
}
