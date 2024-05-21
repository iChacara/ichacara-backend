import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdateAppointmentDTO {
  @ApiProperty({
    description: 'Data e hora de início do agendamento',
    example: '2023-06-01T10:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    description: 'Data e hora de término do agendamento',
    example: '2023-06-01T12:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'Status do agendamento',
    example: 'confirmed',
  })
  @IsOptional()
  @IsString()
  status: string;
}
