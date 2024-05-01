import { IsUUID, IsOptional, IsArray, IsDate } from 'class-validator';

export class UpdateLessorDTO {
  @IsOptional()
  @IsUUID() // Opcional porque as atualizações podem não incluir este campo
  userId?: string; // ID do usuário, identificador único

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true }) // Garante UUID para cada item no array
  postIds?: string[]; // Array de IDs de Post associados

  @IsOptional()
  @IsDate() // Opcional, definido pelo servidor se necessário
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
