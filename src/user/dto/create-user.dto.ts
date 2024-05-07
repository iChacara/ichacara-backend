import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'usuario@example.com', // Exemplo para Swagger
  })
  @IsEmail() // Verifica se o valor é um e-mail válido
  @IsNotEmpty() // Campo obrigatório
  email: string; // Campo para o e-mail do usuário

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João', // Exemplo para Swagger
  })
  @IsString() // Deve ser uma string
  @IsNotEmpty() // Campo obrigatório
  name: string; // Nome curto do usuário

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123', // Exemplo para Swagger
  })
  @IsString() // Deve ser uma string
  @IsNotEmpty() // Campo obrigatório
  @MinLength(6) // Define um comprimento mínimo para a senha
  password: string; // Senha do usuário

  @ApiProperty({
    description: 'Data de criação do usuário (opcional)',
    example: '2024-05-01T12:00:00.000Z', // Exemplo de uma data
  })
  @IsOptional() // Campo opcional para criação
  @IsString() // Deve ser uma string
  createdAt?: string; // Data de criação do usuário (opcional)
}
