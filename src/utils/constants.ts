import { HttpException, HttpStatus } from '@nestjs/common';

export const createLessorPrismaErrors = {
  P2002: () => {
    throw new HttpException(
      'Usuário informado já existe',
      HttpStatus.BAD_REQUEST,
    );
  },
  P2003: () => {
    throw new HttpException(
      'Usuário informado não existe',
      HttpStatus.BAD_REQUEST,
    );
  },
  DEFAULT_ERROR: () => {
    throw new HttpException(
      'Algum erro inesperado aconteceu',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
};

export const POST_STATUS = {
  inactive: '1',
  active: '2',
};
