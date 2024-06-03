import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/_database/prisma.service';
import { POST_STATUS } from 'src/utils/constants';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async createPost(data: any) {
    try {
      const result = await this.prisma.post.create({
        data,
      });
      return result;
    } catch (error) {
      let message = 'Algum erro inesperado aconteceu';
      if (error.code === 'P2003') {
        message = 'Locador informado não existe';
        this.logger.log({ level: 'error', message });
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      this.logger.log({ level: 'error', message });
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPost(id: string) {
    let message = 'Anúncio encontrado com sucesso';

    try {
      this.logger.log(message);
      const post = await this.prisma.post.findUniqueOrThrow({
        where: { id, deletedAt: null },
      });

      return { message, data: post };
    } catch (error) {
      message = 'Não foi possível listar o anúncio';
      if (error.code === 'P2025') {
        message = 'Anúncio não encontrado: ' + id;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllPosts(lessorId) {
    let message = 'Anúncios listados com sucesso';
    try {
      this.logger.log(message);
      const post = await this.prisma.post.findMany({
        where: { deletedAt: null, status: POST_STATUS.active, lessorId },
      });
      message = 'Anúncios listados com sucesso';

      if (post.length === 0) {
        message = 'Nenhum anúncio encontrado';
      }
      return {
        message,
        data: post,
      };
    } catch (error) {
      message = 'Não foi possível listar locatários';

      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePost(id, data) {
    if (data.status) {
      data.status = POST_STATUS[data.status];
    }

    let message = 'Anúncio editado com sucesso';
    try {
      const post = await this.prisma.post.update({ where: { id }, data });
      return { message, data: post };
    } catch (error) {
      message = 'Não foi possível listar o anúncio';
      if (error.code === 'P2025') {
        message = 'Anúncio não encontrado: ' + id;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePost(id: string) {
    let message = 'Anúncio excluído com sucesso';
    try {
      await this.prisma.post.update({
        data: {
          deletedAt: new Date(),
        },
        where: { id, deletedAt: null },
      });
      this.logger.log(message);

      return { message };
    } catch (error) {
      message = 'Não foi possível excluir o anúncio';

      if (error.code === 'P2025') {
        message = 'Anúncio não encontrado: ' + id;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
