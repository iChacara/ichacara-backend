import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  Request,
  Req,
} from '@nestjs/common';
import { Lessor } from 'src/constants/isLessor';
import { CreateBookingDto } from 'src/dto/booking.dto';
import { BookingService } from 'src/services/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Req() request: Request,
  ) {
    return this.bookingService.createBooking(
      createBookingDto,
      request['user'].idLessee,
    );
  }

  @Lessor()
  @Patch(':bookingId/approve')
  async approveBooking(
    @Param('bookingId', ParseIntPipe) bookingId: number,
    @Req() request: Request,
  ) {
    console.log(request['user'].lessorId);
    return this.bookingService.approveBooking(
      request['user'].lessorId,
      bookingId,
    );
  }
}
