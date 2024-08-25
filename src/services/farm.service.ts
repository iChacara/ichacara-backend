import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Farm } from 'src/interfaces/farm.interface';

@Injectable()
export class FarmService {
  constructor(private prismaService: PrismaService) {}

  public async createFarm(farm: Farm) {
    return {
      message: 'Chácara criada com sucesso',
      data: await this.prismaService.farm.create({ data: farm }),
    };
  }

  public async listFarms() {
    return {
      message: 'Chácaras listada com sucesso',
      data: await this.prismaService.farm.findMany(),
    };
  }
}
