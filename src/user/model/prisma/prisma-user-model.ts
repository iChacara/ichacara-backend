import { User } from '@prisma/client';
import { UserModel } from '../user-model';
import { PrismaService } from 'src/_database/prisma.service';
import { UUID, randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AlterUserBody, CreateUserBody, FormatedUser } from '../../dto/_index';

@Injectable()
export class PrismaUserModel implements UserModel {
  constructor(private prisma: PrismaService) {}

  private formatUserReturn(users: User[] | User): FormatedUser[] {
    if (Array.isArray(users)) {
      const formatedUsers: FormatedUser[] = users.map((user) => {
        const { password, ...result } = user;
        return result;
      });

      return formatedUsers;
    } else {
      const { password, ...result } = users as User;
      return [result];
    }
  }

  async create(data: CreateUserBody): Promise<FormatedUser> {
    const uuid = randomUUID();
    const user: User = { ...data, id: uuid };

    const created = await this.prisma.user.create({
      data: user,
    });

    return this.formatUserReturn(created)[0];
  }

  async get(): Promise<FormatedUser[]> {
    const users = await this.prisma.user.findMany();

    return this.formatUserReturn(users);
  }

  async getBy(filter: Partial<User>): Promise<FormatedUser[]> {
    const users = await this.prisma.user.findMany({
      where: filter,
    });

    return this.formatUserReturn(users);
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

    return this.formatUserReturn(user)[0];
  }

  async delete(id: UUID): Promise<FormatedUser> {
    const response = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return this.formatUserReturn(response)[0];
  }
}
