import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class CreateAppointmentDTO {
  @ApiProperty({
    description: 'Data e hora de início do agendamento',
    example: '2023-06-01T10:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'Data e hora de término do agendamento',
    example: '2023-06-01T12:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'ID do post associado ao agendamento',
    example: '3eb71708-6154-4376-9ea2-a651df60773f',
  })
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    description: 'ID do locatário associado ao agendamento',
    example: 'aac00c01-899c-449f-8353-ac96446edfed',
  })
  @IsUUID()
  @IsNotEmpty()
  lesseeId: string;
}
