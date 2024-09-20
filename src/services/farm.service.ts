import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Farm } from 'src/interfaces/farm.interface';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { S3ManagerService } from './s3-manager.service';

@Injectable()
export class FarmService {
  constructor(
    private prismaService: PrismaService,
    private s3ManagerService: S3ManagerService,
  ) { }

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

  public async uploadFarmPics(files: any, farmId: number) {
    const filesUrls = [];

    for (let index = 0; index < files.length; index++) {
      const filePath = 'temp/' + files[index].originalname;
      writeFileSync(filePath, files[index].buffer);

      const key = `profile_${Date.now().toString()}.${files[index].originalname.split('.')[1]}`;

      await this.s3ManagerService.putObject({
        key,
        stream: readFileSync(filePath),
      });

      rmSync(filePath);

      filesUrls.push(
        `${process.env['AWS_ENDPOINT'] ?? 'http://localhost:4566'}/${process.env['AWS_BUCKET_NAME'] ?? 'ichacara-dev'}/${key}`,
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
