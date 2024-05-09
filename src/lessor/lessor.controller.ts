import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { CreateLessorDTO } from './dto/create-lessor.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lessor')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @ApiTags('Lessor')
  @Post()
  async createLessor(
    @Body() lessor: CreateLessorDTO,
  ): Promise<CreateLessorDTO> {
    return this.lessorService.createLessor(lessor);
  }

  @ApiTags('Lessor')
  @Get()
  async getAllLessors(): Promise<any[]> {
    return this.lessorService.getAllLessors();
  }

  @ApiTags('Lessor')
  @Get(':id')
  async getLessorById(@Param('id') id: string): Promise<any> {
    return this.lessorService.getLessorById(id);
  }

  // @ApiTags('Lessor')
  // @Put(':id')
  // async updateLessor(
  //   @Param('id') id: string,
  //   @Body() updateLessorDTO: UpdateLessorDTO,
  // ): Promise<any> {
  //   return this.lessorService.updateLessor(id, updateLessorDTO);
  // }

  @ApiTags('Lessor')
  @Delete(':id')
  async deleteLessor(@Param('id') id: string): Promise<any> {
    return this.lessorService.deleteLessor(id);
  }
}
