import { Injectable } from '@nestjs/common';
import {
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/_database/prisma.service';
import { FormatedUser } from './user';

@Injectable()
export class UserService {
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

  async post(data: Omit<User, 'id'>): Promise<FormatedUser> {
    const uuid = randomUUID();
    const user: User = { ...data, id: uuid };

    const hasEmail = await this.getBy({ email: data.email });

    if (hasEmail.length) {
      throw new NotAcceptableException('Email já cadastrado na plataforma');
    }

    const created = await this.prisma.user.create({
      data: user,
    });

    return this.formatUserReturn(created)[0];
  }

  async getBy(filters: Partial<User>): Promise<FormatedUser[]> {
    const { id, name, email } = filters;
    let query = {};

    if (id) {
      query['id'] = id;
    }
    if (name) {
      query['name'] = name;
    }
    if (email) {
      query['email'] = email;
    }

    const users = await this.prisma.user.findMany({
      where: filters,
    });

    return this.formatUserReturn(users);
  }

  async put(data: Partial<User>): Promise<FormatedUser> {
    const { id } = data;
    let search: FormatedUser;
    try {
      search = await this.getBy({ id: id })[0];
    } catch (error) {
      return error;
    }

    for (const [key, value] of Object.entries(search)) {
      if (!(key in data)) {
        data[key] = value;
      }
    }

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

  async delete(data: Partial<User>): Promise<FormatedUser> {
    const exists = await this.getBy({ id: data.id });

    if (!exists.length) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const response = await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    });

    return this.formatUserReturn(response)[0];
  }
}
