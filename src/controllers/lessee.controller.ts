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

@Controller('lessee')
export class LesseeController {
  constructor(private lesseeService: LesseeService) {}

  @Public()
  @Post()
  async createLessee(@Body() lessee: CreateLesseeDTO) {
    try {
      const createdLessee = await this.lesseeService.createLessee(lessee);

      return {
        message: 'Conta criada com sucesso',
        data: createdLessee,
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
