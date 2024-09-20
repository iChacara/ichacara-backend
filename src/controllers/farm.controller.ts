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
import { I18n, I18nContext } from 'nestjs-i18n';
import { Lessor } from 'src/constants/isLessor';
import { CreateFarmDto } from 'src/dto/farm.dto';
import { FarmService } from 'src/services/farm.service';

@Controller('farm')
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Lessor()
  @Post()
  public async createFarm(
    @Body() farm: CreateFarmDto,
    @Req() request: Request,
    @I18n() i18n: I18nContext
  ) {
    try {
      return this.farmService.createFarm({
        title: farm.title,
        name: farm.name,
        cep: farm.cep,
        street: farm.street,
        number: farm.number,
        complement: farm.complement,
        district: farm.district,
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
      console.log(error)
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
      );
    }
  }

  @Get()
  public async listFarms(@I18n() i18n: I18nContext) {
    try {
      return await this.farmService.listFarms();
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
      );
    }
  }

  @Get(':id')
  public async getFarm(@Param('id') id: number, @I18n() i18n: I18nContext) {
    try {
      return await this.farmService.getFarm(+id);
    } catch (error) {
      if (error.message === 'notFound') {
        throw new NotFoundException(i18n.t('responses.MESSAGES.FARM_NOT_FOUND'));
      }
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
      );
    }
  }

  @Post('upload-farm-pics')
  @UseInterceptors(FilesInterceptor('files'))
  async submitProfilePicture(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('farmId') farmId: string,
    @I18n() i18n: I18nContext
  ) {
    try {
      return this.farmService.uploadFarmPics(files, +farmId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
      );
    }
  }
}
