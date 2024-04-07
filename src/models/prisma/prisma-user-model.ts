import { User } from '@prisma/client';
import { UserModel } from '../user-model';
import { PrismaService } from 'src/database/prisma.service';
import { UUID, randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserBody } from 'src/dto/create-user-body';
import { AlterUserBody } from 'src/dto/alter-user-body';
import { DeleteUserBody } from 'src/dto/delete-user-body';

@Injectable()
export class PrismaUserModel implements UserModel {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserBody): Promise<User> {
    const uuid = randomUUID();
    const user: User = { ...data, id: uuid };

    const created = await this.prisma.user.create({
      data: user,
    });

    return created;
  }

  async get(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async getOne(id: UUID): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  async update(data: AlterUserBody): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return user;
  }

  async delete(id: UUID): Promise<User> {
    const response = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return response;
  }
}
