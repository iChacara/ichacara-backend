import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  AlterUserBody,
  CreateUserBody,
  DeleteUserBody,
  GetUserBody,
  FormatedUser,
} from './dto/_index';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async post(@Body() body: CreateUserBody): Promise<FormatedUser> {
    const user = await this.userService.post(body);

    return user;
  }

  @Get('all')
  async get(): Promise<FormatedUser[]> {
    const users = await this.userService.get();

    return users;
  }

  @Get()
  async getOne(@Body() body: GetUserBody): Promise<FormatedUser> {
    const users = await this.userService.getOne(body);

    return users;
  }

  @Put()
  async put(@Body() body: AlterUserBody): Promise<FormatedUser> {
    const users = await this.userService.getOne(body);

    return users;
  }

  @Delete()
  async delete(@Body() body: DeleteUserBody): Promise<FormatedUser> {
    const user = await this.userService.delete(body);

    return user;
  }
}
