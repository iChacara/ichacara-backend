import { Injectable } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Injectable()
export class LesseeService {
  constructor(private utilsService: UtilsService) {}

  public async createLessee(lesseeData: { email: string; password: string }) {
    return this.utilsService.createLessorOrLessee(lesseeData, 'lessee');
  }
}
