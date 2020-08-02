import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContactEntity } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepo: Repository<ContactEntity>,
  ) {}

  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<ContactEntity | undefined> {
    return await this.contactRepo.findOne({ where: { phoneNumber } });
  }

  async create(values: Record<string, any>): Promise<ContactEntity> {
    const dbContact = await this.findByPhoneNumber(values.phoneNumber);

    if (dbContact) {
      throw new HttpException(
        'Contact already exists for that number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const contact: ContactEntity = this.contactRepo.create({
      ...values,
    });

    return await this.contactRepo.save(contact);
  }
}
