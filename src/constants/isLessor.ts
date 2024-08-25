import { SetMetadata } from '@nestjs/common';

export const IS_LESSOR = 'isLessor';
export const Lessor = () => SetMetadata(IS_LESSOR, true);
