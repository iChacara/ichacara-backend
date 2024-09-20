import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBookingDto } from '../dto/booking.dto';
import { PrismaService } from './prisma.service';
import { Booking } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    lesseeId: number,
  ): Promise<Booking> {
    const { farmId, startDate, endDate, numGuests } = createBookingDto;

    const existingFarmBooking = await this.prisma.booking.findMany({
      where: {
        farmId,
        AND: [
          { startDate: { lte: new Date(endDate).toISOString() } },
          { endDate: { gte: new Date(startDate).toISOString() } },
        ],
      },
    });
    if (existingFarmBooking.length > 0) {
      throw new BadRequestException(
        'A chácara já está agendada para essa data.',
      );
    }

    const existingLesseeBooking = await this.prisma.booking.findMany({
      where: {
        lesseeId,
        AND: [
          { startDate: { lte: new Date(endDate).toISOString() } },
          { endDate: { gte: new Date(startDate).toISOString() } },
        ],
      },
    });
    if (existingLesseeBooking.length > 0) {
      throw new BadRequestException(
        'Você já alugou alguma chácara nessa data.',
      );
    }

    const bookingDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    if (bookingDays < 1 || bookingDays > 10) {
      throw new BadRequestException(
        'O agendamento não pode ultrapassar 10 noites.',
      );
    }

    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException(
        'A data de entrada deve ser antes da data de saída.',
      );
    }

    const today = new Date();
    if (new Date(startDate) < today) {
      throw new BadRequestException(
        'A data de saída deve ser depois da data de entrada.',
      );
    }

    const farm = await this.prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm || !farm.approved) {
      throw new BadRequestException(
        'A chácara não está disponível para alugar.',
      );
    }

    const lessee = await this.prisma.lessee.findUnique({
      where: { id: lesseeId },
      include: { user: true },
    });
    if (!lessee) {
      throw new NotFoundException('Locatário não encontrado.');
    }

    const farmOwner = await this.prisma.lessor.findUnique({
      where: { id: farm.lessorId },
      include: { user: true },
    });
    if (lessee.user.id === farmOwner.user.id) {
      throw new BadRequestException(
        'Você não pode agendar sua própria chácara.',
      );
    }

    if (numGuests > farm.maxOccupancy) {
      throw new BadRequestException(
        `A quantidade máxima de convidados é ${farm.maxOccupancy}.`,
      );
    }

    const totalPrice = bookingDays * farm.dailyPrice;

    const newBooking = await this.prisma.booking.create({
      data: {
        lesseeId,
        farmId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        status: 'pending',
      },
    });

    return newBooking;
  }

  async approveBooking(lessorId: number, bookingId: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        farm: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestException(
        'Só é possível aprovar agendamentos pendentes.',
      );
    }

    const farm = await this.prisma.farm.findUnique({
      where: { id: booking.farmId },
      include: { lessor: true },
    });

    if (!farm || farm.lessorId !== lessorId) {
      throw new ForbiddenException(
        'Você não tem autorização para aprovar esse agendamento.',
      );
    }

    const approvedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'approved',
      },
    });

    return approvedBooking;
  }
}
