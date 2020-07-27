import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findById(
    id: number,
    relations?: string[],
  ): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: { id },
      relations,
    });
  }

  async create(values: Record<string, any>): Promise<UserEntity> {
    const dbUser = await this.findByEmail(values.email);

    if (dbUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: UserEntity = this.userRepo.create(values);

    return await this.userRepo.save(user);
  }

  async update(
    userId: number,
    values: Record<string, any>,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);

    return await this.userRepo.save({ ...user, ...values });
  }
}
