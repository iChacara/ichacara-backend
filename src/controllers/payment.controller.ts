import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreatePaymentDto } from 'src/dto/payment.dto';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // POST /payments - Create a payment and return QR code
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentResponse =
      await this.paymentService.makePayment(createPaymentDto);
    return paymentResponse;
  }

  // GET /payments/:paymentId/status - Check payment status
  @Get(':paymentId/status')
  async checkPaymentStatus(@Param('paymentId') paymentId: string) {
    const paymentStatus =
      await this.paymentService.checkPaymentStatus(paymentId);
    return paymentStatus;
  }
}
