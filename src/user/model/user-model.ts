import { UUID } from 'node:crypto';
import { AlterUserBody, CreateUserBody, FormatedUser } from '../dto/_index';

export abstract class UserModel {
  abstract create(data: CreateUserBody): Promise<FormatedUser>;
  abstract get(): Promise<FormatedUser[]>;
  abstract getOne(id: UUID): Promise<FormatedUser | null>;
  abstract update(data: AlterUserBody): Promise<FormatedUser>;
  abstract delete(id: UUID): Promise<any>;
}
