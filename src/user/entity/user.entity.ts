import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Index,
} from 'typeorm';

import * as argon2 from 'argon2';
import { EntityEnum } from 'src/common/enums/entity';

@Entity(EntityEnum.Users)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // lot va ten
  @Column()
  firstName: string;

  // ho
  @Column()
  lastName: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Index()
  @Column()
  phone: string;

  @Column()
  dateOfBirth: string;

  @Column()
  password: string;

  @Column()
  isVerified: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
