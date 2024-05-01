import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { UpdateLessorDTO } from './dto/update-lessor.dto';
import { CreateLessorDTO } from './dto/create-lessor.dto';

@Controller('lessor')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @Post()
  async createLessor(
    @Body() lessor: CreateLessorDTO,
  ): Promise<CreateLessorDTO> {
    return this.lessorService.createLessor(lessor);
  }

  @Get()
  async getAllLessors(): Promise<any[]> {
    return this.lessorService.getAllLessors();
  }

  @Get(':id')
  async getLessorById(@Param('id') id: string): Promise<any> {
    return this.lessorService.getLessorById(id);
  }

  @Put(':id')
  async updateLessor(
    @Param('id') id: string,
    @Body() updateLessorDTO: UpdateLessorDTO,
  ): Promise<any> {
    return this.lessorService.updateLessor(id, updateLessorDTO);
  }

  @Delete(':id')
  async deleteLessor(@Param('id') id: string): Promise<void> {
    return this.lessorService.deleteLessor(id);
  }
}
