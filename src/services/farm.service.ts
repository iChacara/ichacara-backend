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

  public async getFarm(id: number) {
    const farm = await this.prismaService.farm.findFirst({ where: { id } });
    const message = 'Chácara buscada com sucesso';
    if (!farm) {
      throw new Error('notFound');
    }

    return {
      message,
      data: farm,
    };
  }
}
