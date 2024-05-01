import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty({ description: 'O título do post' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'A descrição do post', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Instruções de rota para o post',
    required: false,
  })
  @IsOptional()
  @IsString()
  routeInstruction: string;

  @ApiProperty({ description: 'O endereço do post' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'A rua do post' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'O distrito do post' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ description: 'A cidade do post' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'O UF (estado) do post' })
  @IsNotEmpty()
  @IsString()
  UF: string;

  @ApiProperty({ description: 'O CEP (código postal) do post' })
  @IsNotEmpty()
  @IsString()
  CEP: string;

  @ApiProperty({
    description: 'Conjunto de URLs de imagens para o post',
    required: false,
    type: 'array',
    items: { type: 'string' },
  })
  @IsOptional()
  @IsArray()
  images: string[];
}
