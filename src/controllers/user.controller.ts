import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Public } from 'src/constants/ispublic';
import { AuthDTO } from 'src/dto/auth.dto';
import { UserService } from 'src/services/user.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('auth')
  async auth(@Body() login: AuthDTO, @I18n() i18n: I18nContext) {
    try {
      const authResult = await this.userService.auth(login);

      return {
        message: i18n.t('responses.MESSAGES.CREATE_ACCOUNT_OK'),
        data: authResult,
      };
    } catch (error) {
      console.log(error)
      if (error.code === 'P2025') {
        throw new BadRequestException(
          i18n.t('responses.MESSAGES.AUTHENTICATION_OK'),
        );
      } else {
        throw new InternalServerErrorException(
          i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
        );
      }
    }
  }

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async submitProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.uploadProfilePicture(
        file,
        request['user'].sub ?? 0,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        i18n.t('responses.MESSAGES.INTERNAL_SERVER_ERROR'),
      );
    }
  }
}
