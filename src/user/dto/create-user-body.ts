import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
