import { Body, Controller, Post } from '@nestjs/common';
import { LesseeService } from '../services/lessee.service';
import { CreateLesseeDTO } from 'src/dto/lessee.dto';

@Controller('lessee')
export class LesseeController {
  constructor(private lesseeService: LesseeService) {}

  @Post()
  async createLessee(@Body() lessee: CreateLesseeDTO) {
    console.log(lessee);
    const createdLessee = await this.lesseeService.createLessee(lessee);

    return createdLessee;
  }
}
