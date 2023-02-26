import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(query: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: query });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }
}
