import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { UpdateAppointmentDTO } from '../dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createAppointment(data: any) {
    const { startDate, postId, type } = data;
    const endDate =
      type === 'visit'
        ? addOneHour(new Date(startDate))
        : addOneDay(new Date(startDate));

    // Verificação de intervalo de 1 hora ou 1 dia para criação
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
              gte:
                type === 'visit'
                  ? subtractOneHour(startDate)
                  : subtractOneDay(startDate),
            },
          },
          {
            endDate: {
              lt: startDate,
              gte:
                type === 'visit'
                  ? subtractOneHour(startDate)
                  : subtractOneDay(startDate),
            },
          },
        ],
      },
    });

    if (conflictingAppointments.length > 0) {
      throw new HttpException(
        `Já existe um agendamento do tipo ${type} para este post dentro do intervalo permitido.`,
        HttpStatus.CONFLICT,
      );
    }

    try {
      const result = await this.prisma.appointment.create({
        data: {
          endDate,
          ...data,
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

  async getAllAppointments(type?: 'visit' | 'rent') {
    try {
      const appointments = await this.prisma.appointment.findMany({
        where: {
          deletedAt: null,
          ...(type ? { type } : {}),
        },
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
    const { startDate, postId, type } = data;
    const endDate = startDate
      ? type === 'visit'
        ? addOneHour(new Date(startDate))
        : addOneDay(new Date(startDate))
      : undefined;

    if (startDate && postId) {
      // Verificação de intervalo de 1 hora ou 1 dia para atualização
      const conflictingAppointments = await this.prisma.appointment.findMany({
        where: {
          postId,
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
                gte:
                  type === 'visit'
                    ? subtractOneHour(startDate)
                    : subtractOneDay(startDate),
              },
            },
            {
              endDate: {
                lt: startDate,
                gte:
                  type === 'visit'
                    ? subtractOneHour(startDate)
                    : subtractOneDay(startDate),
              },
            },
          ],
        },
      });

      if (conflictingAppointments.length > 0) {
        throw new HttpException(
          `Já existe um agendamento do tipo ${type} para este post dentro do intervalo permitido.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    try {
      const appointment = await this.prisma.appointment.update({
        where: { id },
        data: {
          ...data,
          ...(endDate && { endDate }), // Definindo a endDate com base no tipo de agendamento
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
      return { message: 'Agendamento excluído com sucesso' };
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

function addOneHour(date: Date): Date {
  date = new Date(date);
  return new Date(date.getTime() + 60 * 60 * 1000);
}

function subtractOneHour(date: Date): Date {
  date = new Date(date);
  return new Date(date.getTime() - 60 * 60 * 1000);
}

function addOneDay(date: Date): Date {
  date = new Date(date);
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

function subtractOneDay(date: Date): Date {
  date = new Date(date);
  return new Date(date.getTime() - 24 * 60 * 60 * 1000);
}
