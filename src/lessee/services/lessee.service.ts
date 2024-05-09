import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Lessee } from '@prisma/client';
import { PrismaService } from 'src/_database/prisma.service';

@Injectable()
export class LesseeService {
  constructor(
    private readonly prisma: PrismaService,
    private logger: Logger,
  ) {}

  async createLessee(lessee: any): Promise<any> {
    try {
      const createdLessee = await this.prisma.lessee.create({ data: lessee });
      this.logger.log('Locatário criado: ', createdLessee.id);
      return {
        message: 'Conta de locatário escolhida com sucesso!',
      };
    } catch (error) {
      let message = 'Algum erro inesperado aconteceu';
      if (error.code === 'P2002') {
        message = 'Usuário informado já está vinculado a alguma outra conta';
        this.logger.log({ level: 'error', message });
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      if (error.code === 'P2003') {
        message = 'Usuário informado não existe';
        this.logger.log({ level: 'error', message });
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      this.logger.log({ level: 'error', message });
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllLessees(): Promise<{ message: string; lessees: Lessee[] }> {
    let message = 'Locatários listados com sucesso';
    try {
      this.logger.log(message);
      const lessees = await this.prisma.lessee.findMany({
        where: { deletedAt: null },
      });
      message = 'Locatários listados com sucesso';

      if (lessees.length > 0) {
        message: 'Nenhum locatário encontrado';
      }
      return {
        message,
        lessees,
      };
    } catch (error) {
      message = 'Não foi possível listar locatários';

      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getLesseeById(
    id: string,
  ): Promise<{ message: string; lessee: Lessee }> {
    let message = 'Locatário encontrado com sucesso';

    try {
      this.logger.log(message);
      const lessee = await this.prisma.lessee.findUniqueOrThrow({
        where: { id, deletedAt: null },
      });

      return { message, lessee };
    } catch (error) {
      message = 'Não foi possível listar os locatários';
      if (error.code === 'P2025') {
        message = 'Locatário não encontrado: ' + id;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteLessee(id: string): Promise<any> {
    let message = 'Conta de locatário excluída com sucesso';
    try {
      await this.prisma.lessee.update({
        data: {
          deletedAt: new Date(),
        },
        where: { id, deletedAt: null },
      });
      this.logger.log(message);

      return { message };
    } catch (error) {
      message = 'Não foi possível excluir os locatário';

      if (error.code === 'P2025') {
        message = 'Locatário não encontrado: ' + id;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
