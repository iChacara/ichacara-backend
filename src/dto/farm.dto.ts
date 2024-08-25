import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsDecimal,
  IsNumber,
} from 'class-validator';

enum State {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsEnum(State)
  @IsNotEmpty()
  state: State;

  @IsInt()
  @IsPositive()
  numRooms: number;

  @IsInt()
  @IsPositive()
  numBeds: number;

  @IsInt()
  @IsPositive()
  numBathrooms: number;

  @IsInt()
  @IsPositive()
  maxOccupancy: number;

  @IsArray()
  @ArrayNotEmpty()
  services: number[];

  @IsArray()
  @ArrayNotEmpty()
  highlights: number[];

  @IsNumber()
  @IsPositive()
  dailyPrice: number;
}
