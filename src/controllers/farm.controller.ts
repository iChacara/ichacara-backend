import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Patch,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Lessor } from 'src/constants/isLessor';
import { Public } from 'src/constants/ispublic';
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
    @I18n() i18n: I18nContext,
  ) {
    try {
      return await this.farmService.createFarm(
        {
          title: farm.title,
          name: farm.name,
          description: farm.description,
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
          ...(farm.services && { services: farm.services.toString() }),
          ...(farm.highlights && { highlights: farm.highlights.toString() }),
          dailyPrice: farm.dailyPrice,
          lessorId: request['user'].lessorId ?? 0,
        },
        request['user'].sub,
      );
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          i18n.t('responses.MESSAGES.LESSOR_NOT_FOUND'),
        );
      }
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  @Public()
  @Get()
  public async listFarms(@I18n() i18n: I18nContext) {
    try {
      return await this.farmService.listFarms();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  @Get(':id')
  public async getFarm(
    @Param('id') id: number,
    @I18n() i18n: I18nContext,
    @Req() request: Request,
  ) {
    try {
      return await this.farmService.getFarm(+id, request['user']['sub']);
    } catch (error) {
      if (error.message === 'notFound') {
        throw new NotFoundException(
          i18n.t('responses.MESSAGES.FARM_NOT_FOUND'),
        );
      }
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  @Post('upload-farm-pics')
  @UseInterceptors(FilesInterceptor('files'))
  async submitProfilePicture(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('farmId') farmId: string,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.farmService.uploadFarmPics(files, +farmId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  @Patch('approve/:farmId')
  async approveFarm(
    @Param('farmId') farmId: string,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const farm = await this.farmService.approveFarm(+farmId);
      if (!farm) {
        throw new InternalServerErrorException(
          i18n.t('responses.MESSAGES.FARM_NOT_FOUND'),
        );
      }
      return { message: i18n.t('responses.MESSAGES.FARM_APPROVED_SUCCESS') };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }
}
