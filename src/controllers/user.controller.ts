import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth')
  async auth(@Body() login: AuthDTO) {
    try {
      const authResult = await this.userService.auth(login);

      return {
        message: 'Conta criada com sucesso',
        data: authResult,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('E-mail ou senha incorretos');
      } else {
        throw new InternalServerErrorException(
          'Algum erro inesperado aconteceu, tente novamente mais tarde',
        );
      }
    }
  }
}
