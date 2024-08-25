import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { Public } from 'src/constants/ispublic';
import { AuthDTO } from 'src/dto/auth.dto';
import { S3ManagerService } from 'src/services/s3-manager.service';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private s3ManagerService: S3ManagerService,
  ) {}

  @Public()
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
        throw new BadRequestException('Autenticação feita com sucesso');
      } else {
        throw new InternalServerErrorException(
          'Algum erro inesperado aconteceu, tente novamente mais tarde',
        );
      }
    }
  }

  @Public()
  @Post('profile-picture')
  async submitProfilePicture() {
    try {
      return this.s3ManagerService.putObject({ key: Date.now().toString() });
    } catch (error) {
      console.log(error);
    }
  }
}
