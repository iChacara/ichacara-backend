import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LessorCreate } from 'src/interfaces/lessor.interface';
import { PrismaService } from './prisma.service';
import { EventService } from './event.service';
import { eventTypes } from 'src/constants/eventTypes';

@Injectable()
export class UtilsService {
  constructor(
    private prisma: PrismaService,
    private eventService: EventService,
  ) {}

  public async createLessorOrLessee(
    userData: LessorCreate,
    type: 'lessor' | 'lessee',
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);

    const createHelper = {
      lessor: async () => {
        const lessor = await this.prisma.lessor.create({
          data: {
            user: {
              create: {
                email: userData.email,
                password: hashedPassword,
                type,
              },
            },
          },
          include: {
            user: true,
          },
        });
        if (lessor) {
          await this.eventService.createEvent({
            event: eventTypes['conta_criada'],
            userId: lessor.id,
          });
        }
        return lessor;
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
