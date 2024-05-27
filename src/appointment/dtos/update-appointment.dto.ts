import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateAppointmentDTO {
  @ApiProperty({
    description: 'ID do usuário que está criando o agendamento',
    example: 'user-id-example',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'ID do post relacionado ao agendamento',
    example: 'post-id-example',
  })
  @IsOptional()
  @IsString()
  postId?: string;

  @ApiProperty({
    description: 'Data e hora de início do agendamento',
    example: '2023-07-20T14:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    description: 'Tipo de agendamento: visit ou rent',
    example: 'visit',
  })
  @IsOptional()
  @IsEnum(['visit', 'rent'])
  type?: 'visit' | 'rent';

  @ApiProperty({
    description: 'Status do pagamento para aluguel',
    example: 'paid',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    description: 'Preço do aluguel',
    example: 100.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;
}
