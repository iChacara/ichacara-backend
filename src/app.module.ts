import { Module } from '@nestjs/common';
import { LesseeController } from './controllers/lessee.controller';
import { LesseeService } from './services/lessee.service';
import { PrismaService } from './services/prisma.service';
import { LessorService } from './services/lessor.service';
import { UtilsService } from './services/utils.service';
import { LessorController } from './controllers/lessor.controller';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3ManagerModule } from './modules/s3-manager.module';
import { FarmController } from './controllers/farm.controller';
import { FarmService } from './services/farm.service';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { WebhookService } from './services/webhook.service';
import { WebhookController } from './controllers/webhook.controller';
import { S3 } from 'aws-sdk';
console.log(process.env.DO_SPACES_KEY);

@Module({
  imports: [
    S3ManagerModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'auto',
        credentials: {
          accessKeyId: process.env.DO_SPACES_KEY ?? '',
          secretAccessKey: process.env.DO_SPACES_SECRET ?? '',
        },
        endpoint: process.env.DO_SPACES_ENDPOINT ?? '',
        s3ForcePathStyle: true,
      },
      services: [S3]
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [
    LesseeController,
    LessorController,
    UserController,
    FarmController,
    EventController,
    BookingController,
    PaymentController,
    WebhookController,
  ],
  providers: [
    PrismaService,
    LesseeService,
    LessorService,
    UtilsService,
    UserService,
    BookingService,
    JwtService,
    PaymentService,
    WebhookService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    FarmService,
    EventService,
  ],
})
export class AppModule {}
