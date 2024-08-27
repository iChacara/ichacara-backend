import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { EventService } from 'src/services/event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  public async listEvents(@Req() request: Request) {
    try {
      return await this.eventService.listEvents(+request['user'].sub);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Algum erro inesperado aconteceu, tente novamente mais tarde',
      );
    }
  }
}
