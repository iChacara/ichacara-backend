import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LesseeService {
  constructor(private prisma: PrismaService) {}

  public async createLessee(lesseeData: { email: string; password: string }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(lesseeData.password, saltOrRounds);

    return this.prisma.lessee.create({
      data: {
        user: {
          create: {
            email: lesseeData.email,
            password: hashedPassword,
            type: 'lessee',
          },
        },
      },
    });
  }
}
