import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodes } from 'src/common/enums/error-codes';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../entity/user.entity';

export class CreateUserValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const user = await this.userRepo.findOne({ where: { email: value.email } });

    if (user) {
      throw new BadRequestException(ErrorCodes.EmailExist);
    }

    return value;
  }
}
