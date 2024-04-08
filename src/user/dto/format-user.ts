import { IsEmail, IsNotEmpty, IsUUID, Length } from 'class-validator';
import { UUID } from 'crypto';

export class FormatedUser {
  @IsNotEmpty()
  @IsUUID()
  id: UUID | string;

  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
