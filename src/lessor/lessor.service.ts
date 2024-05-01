import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UpdateLessorDTO } from './dto/update-lessor.dto';
import { PrismaService } from 'src/_database/prisma.service';
import { Lessor } from '@prisma/client';

@Injectable()
export class LessorService {
  private readonly logger = new Logger(LessorService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createLessor(lessorDTO: any): Promise<Lessor> {
    this.logger.log('Criando um novo Lessor');
    const lessorCreated = await this.prisma.lessor.create({
      data: lessorDTO,
    });
    return lessorCreated;
  }

  async getAllLessors(): Promise<Lessor[]> {
    this.logger.log('Recuperando todos os Lessors');
    const lessors = await this.prisma.lessor.findMany();
    return lessors;
  }

  async getLessorById(id: string): Promise<Lessor> {
    this.logger.log(`Recuperando Lessor pelo ID: ${id}`);
    const lessor = await this.prisma.lessor.findUnique({
      where: { id },
    });

    if (!lessor) {
      throw new NotFoundException(`Lessor com ID ${id} não encontrado`);
    }

    return lessor;
  }

  async updateLessor(id: string, updateLessorDTO: any): Promise<Lessor> {
    this.logger.log(`Atualizando Lessor pelo ID: ${id}`);
    const updatedLessor = await this.prisma.lessor.update({
      where: { id },
      data: {
        userId: updateLessorDTO.userId,
        ...updateLessorDTO,
      },
    });

    if (!updatedLessor) {
      throw new NotFoundException(
        `Lessor com ID ${id} não encontrado para atualização`,
      );
    }

    return updatedLessor;
  }

  async deleteLessor(id: string): Promise<void> {
    this.logger.log(`Excluindo Lessor pelo ID: ${id}`);
    const lessor = await this.prisma.lessor.findUnique({
      where: { id },
    });

    if (!lessor) {
      throw new NotFoundException(
        `Lessor com ID ${id} não encontrado para exclusão`,
      );
    }

    await this.prisma.lessor.delete({
      where: { id },
    });
  }
}
