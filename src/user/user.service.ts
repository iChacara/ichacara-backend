import { Injectable } from '@nestjs/common';
import {
  AlterUserBody,
  CreateUserBody,
  DeleteUserBody,
  GetUserBody,
  FormatedUser,
} from './dto/_index';
import { UserModel } from './model/user-model';

@Injectable()
export class UserService {
  constructor(private userModel: UserModel) {}

  async post(body: CreateUserBody): Promise<FormatedUser> {
    const user = await this.userModel.create(body);

    return user;
  }

  async get(): Promise<FormatedUser[]> {
    const users = await this.userModel.get();

    return users;
  }

  async getOne(body: GetUserBody): Promise<FormatedUser> {
    const { id } = body;
    try {
      const user = await this.userModel.getOne(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async put(body: AlterUserBody): Promise<FormatedUser> {
    const { id } = body;
    let search: FormatedUser;
    try {
      search = await this.userModel.getOne(id);
    } catch (error) {
      return error;
    }

    for (const [key, value] of Object.entries(search)) {
      if (!(key in body)) {
        body[key] = value;
      }
    }

    const user = await this.userModel.update(body);

    return user;
  }

  async delete(body: DeleteUserBody): Promise<FormatedUser> {
    const { id } = body;

    const user = await this.userModel.delete(id);

    return user;
  }
}
