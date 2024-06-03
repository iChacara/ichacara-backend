import { Injectable, Logger } from '@nestjs/common';
import {
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/_database/prisma.service';
import { FormatedUser } from './user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  SERVICE: string = UserService.name;

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

  async post(data: any): Promise<FormatedUser> {
    const uuid = randomUUID();
    const user: any = { ...data, id: uuid };

    const hasEmail = await this.getBy({ email: data.email });

    if (hasEmail.length) {
      const email = hasEmail[0].email;
      this.logger.log(
        `Attempt to register an already used email - ${email}`,
        this.SERVICE,
      );
      throw new NotAcceptableException('Email já cadastrado na plataforma');
    }

    // Hash password
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);

    const created = await this.prisma.user.create({
      data: user,
    });

    this.logger.log(`User created successfully - ID: ${user.id}`, this.SERVICE);
    return this.formatUserReturn(created)[0];
  }

  async auth(authData: {
    email: string;
    password: string;
  }): Promise<{ message: string; data: any }> {
    const existentUser: User = await this.prisma.user.findUnique({
      where: { email: authData.email },
    });

    let message = 'E-mail ou senha incorretos';

    if (!existentUser) {
      this.logger.log(
        `Attempting to login with a non-existent user - ${authData.email}`,
        this.SERVICE,
      );

      return { message, data: null };
    }

    const isCorrectPassword = await bcrypt.compare(
      authData.password,
      existentUser.password,
    );

    if (!isCorrectPassword) {
      message = 'E-mail ou senha incorretos';

      this.logger.log(
        `Attempting to login with a incorrect password - ${authData.email}`,
        this.SERVICE,
      );
      return { message, data: null };
    }

    const payload = { sub: existentUser.id, username: existentUser.name };

    message = 'Autenticado com sucesso!';

    const jwtToken = await this.jwtService.signAsync(payload);

    this.logger.log(
      `Login attempt successful - ${authData.email}`,
      this.SERVICE,
    );
    return { message, data: { jwtToken, userId: existentUser.id } };
  }

  async getBy(filters: Partial<User>): Promise<FormatedUser[]> {
    const users = await this.prisma.user.findMany({
      where: filters,
    });

    this.logger.log(`Search for users completed - ${filters}`, this.SERVICE);
    return this.formatUserReturn(users);
  }

  async put(id: string, data: any): Promise<FormatedUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.formatUserReturn(user);
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
