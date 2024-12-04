import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { S3ManagerService } from './s3-manager.service';
import { eventTypes } from 'src/constants/eventTypes';
import { EventService } from './event.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private s3ManagerService: S3ManagerService,
    private eventService: EventService,
  ) {}

  public async getUserByToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_SECRET'],
      });
  
      const userId = decoded.sub;
  
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          type: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        }
      });
  
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
  
      return user;
    } catch (error) {
      throw new Error('Token expirado ou inválido');
    }
  }

  public async auth(loginData: { email: string; password: string }) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        email: loginData.email,
      },
      include: {
        lessee: true,
        lessor: true,
      },
    });

    const passwordIsValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!passwordIsValid) {
      const error = new Error();
      error['code'] = 'P2025';

      throw error;
    }

    const type = user.lessee ? 'lessee' : 'lessor';

    await this.eventService.createEvent({
      event: eventTypes['autenticacao_realizada'],
      userId: user.id,
    });

    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          lessorId: user[type].id,
          lesseeId: user[type].id,
          username: user.email,
          type,
        },
        {
          secret: process.env['JWT_SECRET'],
          algorithm: 'HS256',
          expiresIn: '7d',
        },
      ),
    };
  }

  public async uploadProfilePicture(file: any, userId: number) {
    const filePath = 'temp/' + file.originalname;

    writeFileSync(filePath, file.buffer);

    const key = `profile_${Date.now().toString()}.${file.originalname.split('.')[1]}`;

    await this.s3ManagerService.putObject({
      key,
      stream: readFileSync(filePath),
    });

    rmSync(filePath);

    await this.prismaService.user.update({
      data: {
        profilePicture: `${process.env['DO_SPACES_ENDPOINT']}/${process.env['AWS_BUCKET_NAME'] ?? 'ichacara-dev'}/${key}`,
      },
      where: {
        id: userId,
      },
    });

    return {
      message: 'Foto de perfil atualizada com sucesso',
    };
  }
}
