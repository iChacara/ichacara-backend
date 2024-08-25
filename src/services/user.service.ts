import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { S3ManagerService } from './s3-manager.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private s3ManagerService: S3ManagerService,
  ) {}

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

    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.email,
          type,
        },
        {
          secret: process.env['JWT_SECRET'],
          algorithm: 'HS256',
          expiresIn: '1d',
        },
      ),
    };
  }

  public async uploadProfilePicture(file: any) {
    const filePath = 'temp/' + file.originalname;

    writeFileSync(filePath, file.buffer);

    await this.s3ManagerService.putObject({
      key: Date.now().toString(),
      stream: readFileSync(filePath),
    });

    rmSync(filePath);

    return 'Imagem criada!';
  }
}
