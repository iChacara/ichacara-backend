import { IsUUID, IsOptional, IsDate, IsArray } from 'class-validator';

export class LessorDTO {
  @IsUUID()
  userId: string; // Obrigatório para criar um Lessor

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  postIds?: string[]; // Opcional, array de IDs de Post

  @IsOptional()
  @IsDate()
  createdAt?: Date; // Opcional, definido pelo servidor

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
