import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreateFarmDto } from 'src/dto/farm.dto';
import { FarmService } from 'src/services/farm.service';

@Controller('farm')
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Post()
  public async createFarm(
    @Body() farm: CreateFarmDto,
    @Req() request: Request,
  ) {
    try {
      return this.farmService.createFarm({
        title: farm.title,
        name: farm.name,
        cep: farm.cep,
        street: farm.street,
        number: farm.number,
        complement: farm.complement,
        neighborhood: farm.neighborhood,
        city: farm.city,
        state: farm.state,
        numRooms: farm.numRooms,
        numBeds: farm.numBeds,
        numBathrooms: farm.numBathrooms,
        maxOccupancy: farm.maxOccupancy,
        services: farm.services.toString(),
        highlights: farm.highlights.toString(),
        dailyPrice: farm.dailyPrice,
        lessorId: request['user'].lessorId ?? 0,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }

  @Get()
  public async listFarms() {
    try {
      return await this.farmService.listFarms();
    } catch (error) {
      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }

  @Get(':id')
  public async getFarm(@Param('id') id: number) {
    try {
      return await this.farmService.getFarm(+id);
    } catch (error) {
      if (error.message === 'notFound') {
        throw new NotFoundException('Chácara não encontrada');
      }
      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }

  @Post('upload-farm-pics')
  @UseInterceptors(FilesInterceptor('files'))
  async submitProfilePicture(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('farmId') farmId: string,
  ) {
    try {
      return this.farmService.uploadFarmPics(files, +farmId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }
}
