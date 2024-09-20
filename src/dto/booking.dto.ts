// dto/create-booking.dto.ts
import { IsNotEmpty, IsDateString, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  lesseeId: number;

  @IsInt()
  @IsNotEmpty()
  farmId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsInt()
  @Min(1)
  numGuests: number;
}
