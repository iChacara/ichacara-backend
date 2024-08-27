import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Event } from 'src/interfaces/event.interface';
@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  public async createEvent(event: Event) {
    return await this.prismaService.event.create({
      data: event,
    });
  }

  public async listEvents(userId) {
    return await this.prismaService.event.findMany({ where: { userId } });
  }
}
