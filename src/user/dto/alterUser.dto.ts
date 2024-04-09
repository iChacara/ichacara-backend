import {
  IsEmail,
  Length,
  MinLength,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class AlterUserDTO {
  @IsNotEmpty()
  @IsUUID()
  id: UUID;

  @Length(5, 50)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
