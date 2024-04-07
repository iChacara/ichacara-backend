import { User } from '@prisma/client';
import { UUID } from 'node:crypto';
import { AlterUserBody } from 'src/dto/alter-user-body';
import { CreateUserBody } from 'src/dto/create-user-body';
import { DeleteUserBody } from 'src/dto/delete-user-body';

export abstract class UserModel {
  abstract create(data: CreateUserBody): Promise<User>;
  abstract get(): Promise<User[]>;
  abstract getOne(id: UUID): Promise<User | null>;
  abstract update(data: AlterUserBody): Promise<User>;
  abstract delete(id: UUID): Promise<any>;
}
