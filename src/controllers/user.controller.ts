import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/constants/ispublic';
import { AuthDTO } from 'src/dto/auth.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
  @UseInterceptors(FileInterceptor('file'))
  async submitProfilePicture(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.userService.uploadProfilePicture(file);
    } catch (error) {
      console.log(error);
    }
  }
}
