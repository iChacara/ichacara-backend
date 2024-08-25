import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Farm } from 'src/interfaces/farm.interface';

@Injectable()
export class FarmService {
  constructor(private prismaService: PrismaService) {}

  public async createFarm(farm: Farm) {
    return await this.prismaService.farm.create({ data: farm });
  }
}
