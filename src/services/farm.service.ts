import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Farm } from 'src/interfaces/farm.interface';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { S3ManagerService } from './s3-manager.service';
import { EventService } from './event.service';

@Injectable()
export class FarmService {
  constructor(
    private prismaService: PrismaService,
    private s3ManagerService: S3ManagerService,
    private eventService: EventService,
  ) {}

  public async createFarm(farm: Farm, userId: number) {
    const data = await this.prismaService.farm.create({ data: farm });
    await this.eventService.createEvent({ event: 'Chácara criada', userId });
    return {
      message: 'Chácara criada com sucesso',
      data,
    };
  }

  public async listFarms() {
    return {
      message: 'Chácaras listada com sucesso',
      data: await this.prismaService.farm.findMany(),
    };
  }

  public async getFarm(id: number, userId: number) {
    const farm = await this.prismaService.farm.findFirst({ where: { id } });
    const message = 'Chácara buscada com sucesso';
    if (!farm) {
      throw new Error('notFound');
    }

    this.eventService.createEvent({
      userId,
      event: `Chácara id:${farm.id} listada`,
    });

    return {
      message,
      data: farm,
    };
  }

  public async uploadFarmPics(files: any, farmId: number) {
    const filesUrls = [];

    for (let index = 0; index < files.length; index++) {
      const filePath = 'temp/' + files[index].originalname;
      writeFileSync(filePath, files[index].buffer);

      const key = `farm_${farmId}/profile_${Date.now().toString()}.${files[index].originalname.split('.')[1]}`;
      console.log(process.env);

      await this.s3ManagerService.putObject({
        key,
        stream: readFileSync(filePath),
      });

      rmSync(filePath);

      filesUrls.push(
        `${process.env['DO_CDN_ENDPOINT'] ?? ''}/${process.env['DO_SPACES_NAME'] ?? 'ichacara'}/${key}`,
      );
    }

    const farm = await this.prismaService.farm.findFirst({
      select: { id: true },
      where: { id: farmId },
    });

    if (!farm) {
      throw new NotFoundException('A chácara não foi encontrada');
    }
    await this.prismaService.farm.update({
      data: {
        photos: JSON.stringify(filesUrls),
      },
      where: {
        id: farmId,
      },
    });

    return {
      message: 'Fotos da chácara atualizadas com sucesso',
    };
  }
}
