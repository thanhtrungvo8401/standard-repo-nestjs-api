import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Index,
} from 'typeorm';

import * as argon2 from 'argon2';
import { EntityEnum } from 'src/utils/enums/entity';

@Entity(EntityEnum.Users)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Index()
  @Column()
  phone: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
