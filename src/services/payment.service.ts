import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

@Injectable()
export class PaymentService {
  private client = new MercadoPagoConfig({
    accessToken: process.env['MP_ACCESS_TOKEN'] ?? '',
    options: { timeout: 5000, idempotencyKey: 'abc' },
  });

  public payment = new Payment(this.client);

  public async makePayment(body: PaymentCreateRequest) {
    const requestOptions = {
      idempotencyKey: 'abc',
    };

    const response = await this.payment.create({ body, requestOptions });
    const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 =
      response?.point_of_interaction?.transaction_data?.qr_code_base64;

      
    return {
      qrCode,
      qrCodeBase64,
    };
  }

  // Verificar o status do pagamento
  public async checkPaymentStatus(paymentId: string) {
    try {
      const payment = await this.payment.get({ id: paymentId });
      const status = payment.status;
      console.log(payment);

      return { status };
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw new Error('Não foi possível verificar o status do pagamento.');
    }
  }
}
