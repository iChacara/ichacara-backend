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
    console.log(i18n.t('responses.TEST.LIBRARY'))
    try {
      const createdLessor = await this.lessorService.createLessor(lessor);

      return {
        message: 'Conta criada com sucesso',
        data: createdLessor,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Endereço e-mail indisponível');
      } else {
        throw new InternalServerErrorException(
          'Algum erro inesperado aconteceu, tente novamente mais tarde',
        );
      }
    }
  }
}
