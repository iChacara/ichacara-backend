import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { EventService } from 'src/services/event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  public async listEvents(@Req() request: Request, @I18n() i18n: I18nContext) {
    try {
      return await this.eventService.listEvents(+request['user'].sub);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
      );
    }
  }
}
