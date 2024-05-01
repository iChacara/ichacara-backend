import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLessorDTO {
  @ApiProperty({
    description: 'ID do usuário associado ao Locador',
    example: '52a09c36-40af-4dea-8cbf-d97368f23774', // Exemplo para Swagger
  })
  @IsUUID() // Validação para garantir que seja um UUID
  @IsNotEmpty() // O campo é obrigatório
  userId: string; // Obrigatório para criar um Lessor
}
