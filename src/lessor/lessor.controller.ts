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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LessorService } from './lessor.service';
import { UpdateLessorDTO } from './dto/update-lessor.dto';
import { LessorDTO } from './dto/lessor.dto';

@Controller('lessor') // Controlador para gerenciar Lessors
@ApiTags('Lessor') // Tag do Swagger para documentação
@UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // Aplicar validação globalmente
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo Lessor' }) // Descrição para o Swagger
  @ApiResponse({ status: 201, description: 'Lessor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiBody({
    type: LessorDTO,
    examples: {
      example1: {
        summary: 'Criar Lessor',
        value: {
          userId: '12345', // Exemplo de dados para criar um Lessor
        },
      },
    },
  }) // Define o corpo da solicitação esperado com exemplos
  async createLessor(@Body() lessorDTO: LessorDTO): Promise<LessorDTO> {
    return this.lessorService.createLessor(lessorDTO); // Criar o Lessor
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os Lessors' })
  @ApiResponse({ status: 200, description: 'Lista de todos os Lessors' })
  async getAllLessors(): Promise<LessorDTO[]> {
    return this.lessorService.getAllLessors(); // Retornar todos os Lessors
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter Lessor pelo ID' })
  @ApiResponse({ status: 200, description: 'Lessor encontrado' })
  @ApiResponse({ status: 404, description: 'Lessor não encontrado' })
  async getLessorById(@Param('id') id: string): Promise<LessorDTO> {
    return this.lessorService.getLessorById(id); // Retornar o Lessor pelo ID
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Lessor' })
  @ApiResponse({ status: 200, description: 'Lessor atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 404, description: 'Lessor não encontrado' })
  @ApiBody({
    type: UpdateLessorDTO,
    examples: {
      example1: {
        summary: 'Atualizar Lessor',
        value: {
          userId: 'novo-user-id',
          postIds: ['post-id-1', 'post-id-2'], // Exemplo de dados para atualização
        },
      },
    },
  })
  async updateLessor(
    @Param('id') id: string,
    @Body() updateLessorDTO: UpdateLessorDTO,
  ): Promise<LessorDTO> {
    return this.lessorService.updateLessor(id, updateLessorDTO); // Atualizar o Lessor
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um Lessor' })
  @ApiResponse({ status: 200, description: 'Lessor excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Lessor não encontrado' })
  async deleteLessor(@Param('id') id: string): Promise<void> {
    return this.lessorService.deleteLessor(id); // Excluir o Lessor pelo ID
  }
}
