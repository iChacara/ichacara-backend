import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { CreateAppointmentDTO } from '../dtos/create-appointment.dto';
import { UpdateAppointmentDTO } from '../dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createAppointment(data: CreateAppointmentDTO) {
    const { postId } = data;
    const startDate = new Date(data.startDate);
    const endDate = addOneHour(new Date(startDate));

    // Verificação de intervalo de 1 hora para criação
    const conflictingAppointments = await this.prisma.appointment.findMany({
      where: {
        postId,
        deletedAt: null,
        OR: [
          {
            startDate: {
              lt: endDate,
              gte: startDate,
            },
          },
          {
            endDate: {
              lt: endDate,
              gte: startDate,
            },
          },
          {
            startDate: {
              lt: startDate,
              gte: subtractOneHour(startDate),
            },
          },
          {
            endDate: {
              lt: startDate,
              gte: subtractOneHour(startDate),
            },
          },
        ],
      },
    });

    if (conflictingAppointments.length > 0) {
      throw new HttpException(
        'Já existe um agendamento para este post dentro do intervalo de 1 hora.',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const result = await this.prisma.appointment.create({
        data: {
          ...data,
          endDate, // Definindo a endDate como uma hora após a startDate
        },
      });
      return result;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Já existe um agendamento com as mesmas informações fornecidas.',
          HttpStatus.CONFLICT,
        );
      }
      if (error.code === 'P2003') {
        throw new HttpException(
          'O usuário ou post informado não existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error(error);
      throw new HttpException(
        'Erro ao criar agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllAppointments() {
    try {
      const appointments = await this.prisma.appointment.findMany({
        where: { deletedAt: null },
      });
      return appointments;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao buscar agendamentos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAppointmentById(id: string) {
    try {
      const appointment = await this.prisma.appointment.findUniqueOrThrow({
        where: { id, deletedAt: null },
      });
      return appointment;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'Agendamento não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      console.error(error);
      throw new HttpException(
        'Erro ao buscar agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAppointment(id: string, data: UpdateAppointmentDTO) {
    const startDate = new Date(data.startDate);
    const endDate = addOneHour(startDate);

    // Verificação de intervalo de 1 hora para atualização
    const conflictingAppointments = await this.prisma.appointment.findMany({
      where: {
        deletedAt: null,
        id: {
          not: id,
        },
        OR: [
          {
            startDate: {
              lt: endDate,
              gte: startDate,
            },
          },
          {
            endDate: {
              lt: endDate,
              gte: startDate,
            },
          },
          {
            startDate: {
              lt: startDate,
              gte: subtractOneHour(startDate),
            },
          },
          {
            endDate: {
              lt: startDate,
              gte: subtractOneHour(startDate),
            },
          },
        ],
      },
    });

    if (conflictingAppointments.length > 0) {
      throw new HttpException(
        'Já existe um agendamento para este post dentro do intervalo de 1 hora.',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const appointment = await this.prisma.appointment.update({
        where: { id },
        data: {
          ...data,
          endDate, // Definindo a endDate como uma hora após a startDate
        },
      });
      return appointment;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'Agendamento não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.code === 'P2003') {
        throw new HttpException(
          'O usuário ou post informado não existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error(error);
      throw new HttpException(
        'Erro ao atualizar agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAppointment(id: string) {
    try {
      await this.prisma.appointment.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return { message: 'Agendamento excluído com sucesso.' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'Agendamento não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      console.error(error);
      throw new HttpException(
        'Erro ao excluir agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// Funções utilitárias para manipulação de datas
function addOneHour(date: Date): Date {
  console.log(date.getTime());
  return new Date(date.getTime() + 60 * 60 * 1000);
}

function subtractOneHour(date: Date): Date {
  return new Date(date.getTime() - 60 * 60 * 1000);
}
