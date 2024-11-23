import { Injectable } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { LessorCreate } from 'src/interfaces/lessor.interface';

@Injectable()
export class LessorService {
  constructor(private utilsService: UtilsService) {}

  public async createLessor(lessorData: LessorCreate) {
    console.log('jorge >>>>>>>>>>>>>>>>>>>>>>');

    return this.utilsService.createLessorOrLessee(lessorData, 'lessor');
  }
}
