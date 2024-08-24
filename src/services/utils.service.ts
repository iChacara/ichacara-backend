import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LessorCreate } from 'src/interfaces/lessor.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class UtilsService {
  constructor(private prisma: PrismaService) {}

  public async createLessorOrLessee(
    userData: LessorCreate,
    type: 'lessor' | 'lessee',
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);

    const createHelper = {
      lessor: () => {
        return this.prisma.lessor.create({
          data: {
            user: {
              create: {
                email: userData.email,
                password: hashedPassword,
                type,
              },
            },
          },
        });
      },
      lessee: () => {
        return this.prisma.lessee.create({
          data: {
            user: {
              create: {
                email: userData.email,
                password: hashedPassword,
                type,
              },
            },
          },
        });
      },
    };

    return createHelper[type]();
  }
}
