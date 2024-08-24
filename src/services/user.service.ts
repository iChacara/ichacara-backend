import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async auth(loginData: { email: string; password: string }) {
    const user = await this.prismaService.user.findFirstOrThrow({
      select: {
        id: true,
        password: true,
      },
      where: {
        email: loginData.email,
      },
    });

    const passwordIsValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!passwordIsValid) {
      const error = new Error();
      error['code'] = 'P2025';

      throw error;
    }
  }
}
