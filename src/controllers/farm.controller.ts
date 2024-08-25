import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
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
}
