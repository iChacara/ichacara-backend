import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserBody } from '../dto/create-user-body';
import { User } from '@prisma/client';
import { UserModel } from 'src/models/user-model';
import { AlterUserBody } from 'src/dto/alter-user-body';
import { GetUserBody } from 'src/dto/get-user-body';
import { DeleteUserBody } from 'src/dto/delete-user-body';

@Controller()
export class AppController {
  constructor(private userModel: UserModel) {}

  @Post('user')
  async postUser(@Body() body: CreateUserBody): Promise<User> {
    const user = await this.userModel.create(body);

    return user;
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.get();

    return users;
  }

  @Get('user')
  async getUser(@Body() body: GetUserBody): Promise<User> {
    const { id } = body;
    try {
      const user = await this.userModel.getOne(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Put('user')
  async putUser(@Body() body: AlterUserBody): Promise<User> {
    const { id } = body;
    let search: User;
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

  @Delete('user')
  async deleteUser(@Body() body: DeleteUserBody): Promise<User> {
    const { id } = body;

    const user = await this.userModel.delete(id);

    return user;
  }
}
