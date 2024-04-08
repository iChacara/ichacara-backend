import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetUserBody {
  @IsNotEmpty()
  @IsUUID()
  id: UUID;
}
