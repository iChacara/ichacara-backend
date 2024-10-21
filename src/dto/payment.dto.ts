import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PayerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  payment_method_id: string;

  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;
}
