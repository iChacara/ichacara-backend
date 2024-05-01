import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Para documentação

export class UpdateLessorDTO {
  @ApiProperty({
    description: 'ID do locador',
    example: '52a09c36-40af-4dea-8cbf-d97368f23774', // Exemplo para Swagger
  })
  @IsUUID() // Validação para garantir que seja um UUID
  @IsNotEmpty() // O campo é obrigatório
  lessorId: string; // ID do locador que está sendo associado ao Locador
}
