import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UpdateLessorDTO } from './dto/update-lessor.dto';
import { LessorDTO } from './dto/lessor.dto';
import { PrismaService } from 'src/_database/prisma.service';

@Injectable()
export class LessorService {
  private readonly logger = new Logger(LessorService.name); // Logger para rastrear ações

  constructor(private readonly prisma: PrismaService) {} // Injeção do PrismaService

  // Criar um novo Lessor
  async createLessor(lessorDTO: LessorDTO): Promise<LessorDTO> {
    this.logger.log('Criando um novo Lessor'); // Log para rastrear ações
    const newLessor = await this.prisma.lessor.create({
      data: {
        lessorDTO,
      },
    });
    return newLessor;
  }

  // Obter todos os Lessors
  async getAllLessors(): Promise<LessorDTO[]> {
    this.logger.log('Recuperando todos os Lessors'); // Log para rastrear ações
    const lessors = await this.prisma.lessor.findMany();
    return lessors;
  }

  // Obter um Lessor pelo ID
  async getLessorById(id: string): Promise<LessorDTO> {
    this.logger.log(`Recuperando Lessor pelo ID: ${id}`); // Log para rastrear ações
    const lessor = await this.prisma.lessor.findUnique({
      where: { id },
    });

    if (!lessor) {
      throw new NotFoundException(`Lessor com ID ${id} não encontrado`); // Exceção se não encontrado
    }

    return lessor;
  }

  // Atualizar um Lessor pelo ID
  async updateLessor(
    id: string,
    updateLessorDTO: UpdateLessorDTO,
  ): Promise<LessorDTO> {
    this.logger.log(`Atualizando Lessor pelo ID: ${id}`); // Log para rastrear ações
    const updatedLessor = await this.prisma.lessor.update({
      where: { id },
      data: {
        userId: updateLessorDTO.userId,
        post: {
          connect: updateLessorDTO.postIds?.map((id) => ({ id })),
        },
      },
    });

    if (!updatedLessor) {
      throw new NotFoundException(
        `Lessor com ID ${id} não encontrado para atualização`,
      ); // Exceção se não encontrado
    }

    return updatedLessor;
  }

  // Excluir um Lessor pelo ID
  async deleteLessor(id: string): Promise<void> {
    this.logger.log(`Excluindo Lessor pelo ID: ${id}`); // Log para rastrear ações
    const lessor = await this.prisma.lessor.findUnique({
      where: { id },
    });

    if (!lessor) {
      throw new NotFoundException(
        `Lessor com ID ${id} não encontrado para exclusão`,
      ); // Exceção se não encontrado
    }

    await this.prisma.lessor.delete({
      where: { id },
    });
  }
}
