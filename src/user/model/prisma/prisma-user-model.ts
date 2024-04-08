import { User } from '@prisma/client';
import { UserModel } from '../user-model';
import { PrismaService } from 'src/_database/prisma.service';
import { UUID, randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AlterUserBody, CreateUserBody, FormatedUser } from '../../dto/_index';

@Injectable()
export class PrismaUserModel implements UserModel {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserBody): Promise<FormatedUser> {
    const uuid = randomUUID();
    const user: User = { ...data, id: uuid };

    const created = await this.prisma.user.create({
      data: user,
    });

    const { password, ...result } = created;

    return result;
  }

  async get(): Promise<FormatedUser[]> {
    const users = await this.prisma.user.findMany();

    const FormatedUsers: FormatedUser[] = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return FormatedUsers;
  }

  async getOne(id: UUID): Promise<FormatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  async update(data: AlterUserBody): Promise<FormatedUser> {
    const user = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    const { password, ...result } = user;

    return result;
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
