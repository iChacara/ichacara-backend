import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'src/constants/ispublic';
import { WebhookService } from 'src/services/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  async handlePaymentNotification(@Body() notification: any) {
    await this.webhookService.processNotification(notification);
  }
}
