import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LesseeService } from '../services/lessee.service';
import { CreateLesseeDTO } from 'src/dto/lessee.dto';
import { Public } from 'src/constants/ispublic';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('lessee')
export class LesseeController {
  constructor(private lesseeService: LesseeService) {}

  @Public()
  @Post()
  async createLessee(@Body() lessee: CreateLesseeDTO, @I18n() i18n: I18nContext) {
    try {
      const createdLessee = await this.lesseeService.createLessee(lessee);

      return {
        message: i18n.t('responses.MESSAGES.CREATE_ACCOUNT_OK'),
        data: createdLessee,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(i18n.t('responses.MESSAGES.EMAIL_ADDRESS_UNAVAIABLE'));
      } else {
        throw new InternalServerErrorException(
          i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR')
        );
      }
    }
  }
}
