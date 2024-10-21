import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  public async processNotification(notification: any) {
    // Aqui você pode processar a notificação recebida
    // Por exemplo, registrar o pagamento no banco de dados ou realizar alguma ação

    const { type, data } = notification;

    // Você pode verificar o tipo de notificação
    switch (type) {
      case 'payment':
        // Aqui você pode implementar a lógica para lidar com o pagamento
        console.log('Pagamento recebido:', data);
        // Salvar o pagamento no banco de dados, se necessário
        break;
      // Você pode adicionar outros tipos de notificação se necessário
      default:
        console.warn('Tipo de notificação não reconhecido:', type);
    }
  }
}
