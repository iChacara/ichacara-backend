import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class DeleteUserBody {
  @IsNotEmpty()
  @IsUUID()
  id: UUID;
}
