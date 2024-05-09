import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLesseeDTO {
  @ApiProperty({
    description: 'ID do usuário associado ao inquilino (Lessee)',
    example: 'b6e5b77c-40af-4dea-8cbf-d97368f23774',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
