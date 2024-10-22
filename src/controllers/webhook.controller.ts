import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'src/constants/ispublic';
import { WebhookService } from 'src/services/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handlePaymentNotification(@Body() notification: any) {
    await this.webhookService.processNotification(notification);
  }
}
