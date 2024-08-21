import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class LesseeService {
  constructor(private prisma: PrismaService) {}

  public createLessee(lesseeData: { email: string; password: string }) {
    return this.prisma.lessee.create({
      data: {
        user: {
          create: {
            email: lesseeData.email,
            password: lesseeData.password,
            type: 'lessee',
          },
        },
      },
    });
  }
}
