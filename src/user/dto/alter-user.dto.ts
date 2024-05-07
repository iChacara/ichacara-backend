import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength } from 'class-validator';

export class AlterUserDTO {
  @Length(5, 50)
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do usuário, deve ter entre 5 e 50 caracteres.',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao.silva@exemplo.com',
    description: 'Email do usuário, deve ser um endereço de email válido.',
  })
  email: string;

  @MinLength(8)
  @ApiProperty({
    example: 'S3nh@forte',
    description: 'Senha do usuário, deve ter no mínimo 8 caracteres.',
  })
  password: string;
}
