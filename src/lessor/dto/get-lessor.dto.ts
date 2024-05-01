import { IsEmail, IsOptional, IsUUID, Length } from 'class-validator';
import { UUID } from 'crypto';

export class GetUserDTO {
  @IsUUID()
  @IsOptional()
  id: UUID;

  @Length(5, 50)
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  password: string;
}
