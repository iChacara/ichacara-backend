import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LesseeService } from './services/lessee.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLesseeDTO } from './dto/create-lessee.dto';

@Controller('lessee')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LesseeController {
  constructor(private readonly lesseeService: LesseeService) {}

  @ApiTags('Lessee')
  @Post()
  async createLessee(
    @Body() lessee: CreateLesseeDTO,
  ): Promise<CreateLesseeDTO> {
    return this.lesseeService.createLessee(lessee);
  }

  @ApiTags('Lessee')
  @Get()
  async getAllLessees(): Promise<any> {
    return this.lesseeService.getAllLessees();
  }

  @ApiTags('Lessee')
  @Get(':id')
  async getLesseeById(@Param('id') id: string): Promise<any> {
    return this.lesseeService.getLesseeById(id);
  }

  @ApiTags('Lessee')
  @Delete(':id')
  async deleteLessee(@Param('id') id: string): Promise<any> {
    return this.lesseeService.deleteLessee(id);
  }
}
