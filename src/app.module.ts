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
import { SharedIniFileCredentials, S3 } from 'aws-sdk';
import { S3ManagerModule } from './modules/s3-manager.module';
import { FarmController } from './controllers/farm.controller';
import { FarmService } from './services/farm.service';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';

@Module({
  imports: [
    S3ManagerModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: new SharedIniFileCredentials({
          profile: 'localstack',
        }),
        endpoint: 'http://localhost:4566',
        s3ForcePathStyle: true,
      },
      services: [S3],
    }),
  ],
  controllers: [
    LesseeController,
    LessorController,
    UserController,
    FarmController,
    EventController,
  ],
  providers: [
    PrismaService,
    LesseeService,
    LessorService,
    UtilsService,
    UserService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    FarmService,
    EventService,
  ],
})
export class AppModule {}
