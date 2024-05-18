import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsJSON,
} from 'class-validator';

export class UpdatePostDTO {
  @ApiProperty({
    description: 'O título do post',
    example: 'Casa aconchegante em São Paulo',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A descrição do post',
    example: 'Uma linda casa com três quartos e um grande quintal.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Instruções de rota para o post',
    example: 'Após a ponte, vire à direita e siga por 500 metros.',
    required: false,
  })
  @IsOptional()
  @IsString()
  routeInstruction: string;

  @ApiProperty({
    description: 'O número do endereço do post',
    example: '123',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({
    description: 'A rua do post',
    example: 'Rua das Flores',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'O distrito do post',
    example: 'Centro',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  district: string;

  @ApiProperty({
    description: 'A cidade do post',
    example: 'São Paulo',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'O UF (estado) do post',
    example: 'SP',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  UF: string;

  @ApiProperty({
    description: 'O CEP (código postal) do post',
    example: '01001-000',
    required: false,
  })
  @IsOptional()
  @IsOptional()
  @IsString()
  CEP: string;

  @ApiProperty({
    description: 'Complemento do endereço do post',
    example: 'Apto 101',
    required: false,
  })
  @IsOptional()
  @IsOptional()
  @IsString()
  complement: string;

  @ApiProperty({
    description: 'Imagens do post em formato JSON',
    example:
      '[{"url": "http://example.com/image1.jpg"}, {"url": "http://example.com/image2.jpg"}]',
    required: false,
  })
  @IsOptional()
  @IsOptional()
  @IsJSON()
  images: string;

  @ApiProperty({
    description: 'ID do locador associado ao post',
    example: '07dbad2d-5ee2-4fd6-ab08-f4fb24fcff8b',
  })
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  lessorId: string;

  @ApiProperty({
    description: 'Status do anúncio',
    example: 'active',
  })
  @IsOptional()
  @IsString()
  status: string;
}
