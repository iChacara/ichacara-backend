import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { Lessor } from '@prisma/client';
import { createLessorPrismaErrors } from '../utils/constants';

@Injectable()
export class LessorService {
  private readonly logger = new Logger(LessorService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createLessor(lessorDTO: any): Promise<any> {
    try {
      const lessorCreated = await this.prisma.lessor.create({
        data: lessorDTO,
      });
      this.logger.log('Locador criado: ', lessorCreated.id);
      return { message: 'Conta de locador escolhida com sucesso!' };
    } catch (e: any) {
      this.logger.log({
        level: 'error',
        message: 'Erro ao criar usuário: ' + e.code,
      });
      if (createLessorPrismaErrors[e.code]) {
        createLessorPrismaErrors[e.code]();
      }
      createLessorPrismaErrors['DEFAULT_ERROR']();
    }
  }

  async getAllLessors(): Promise<Lessor[]> {
    try {
      this.logger.log('Locadores listados');
      const lessors = await this.prisma.lessor.findMany();
      return lessors;
    } catch (error) {
      throw new HttpException(
        'Não foi possível listar locadores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLessorById(id: string): Promise<Lessor> {
    try {
      this.logger.log(`Recuperando Lessor pelo ID: ${id}`);
      const lessor = await this.prisma.lessor.findUniqueOrThrow({
        where: { id },
      });

      return lessor;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Locador não encontrado', HttpStatus.NOT_FOUND);
      }
    }
  }

  // async updateLessor(id: string, updateLessorDTO: any): Promise<Lessor> {
  //   this.logger.log(`Atualizando Lessor pelo ID: ${id}`);
  //   const updatedLessor = await this.prisma.lessor.update({
  //     where: { id },
  //     data: {
  //       userId: updateLessorDTO.userId,
  //       ...updateLessorDTO,
  //     },
  //   });

  //   if (!updatedLessor) {
  //     throw new NotFoundException(
  //       `Lessor com ID ${id} não encontrado para atualização`,
  //     );
  //   }

  //   return updatedLessor;
  // }

  async deleteLessor(id: string): Promise<any> {
    try {
      await this.prisma.lessor.update({
        data: {
          deletedAt: new Date(),
        },
        where: { id, deletedAt: null },
      });
      this.logger.log(`Locador com id ${id} excluído`);

      return { message: 'Conta de locador excluída com sucesso' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Locador não encontrado', HttpStatus.NOT_FOUND);
      }
    }
  }
}
