import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LessorService } from '../services/lessor.service';
import { CreateLessorDTO } from 'src/dto/lessor.dto';
import { Public } from 'src/constants/ispublic';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('lessor')
export class LessorController {
  constructor(private lessorService: LessorService) {}

  @Public()
  @Post()
  async createLessor(@Body() lessor: CreateLessorDTO, @I18n() i18n: I18nContext) {
    try {
      const createdLessor = await this.lessorService.createLessor(lessor);

      return {
        message: i18n.t('responses.MESSAGES.CREATE_ACCOUNT_OK'),
        data: createdLessor,
      };
    } catch (error) {
      console.log(error);
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
