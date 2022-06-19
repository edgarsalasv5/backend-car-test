import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

enum eStatus {
  TRUE = 'true',
  FALSE = 'false',
}

export class CarFindDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsString()
  model: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  car_identification: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  color: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsEnum(eStatus)
  status: eStatus;
}

export interface filterOptionsDto {
  brand?: string;
  model?: number;
  color?: string;
  status?: boolean;
  car_identification?: string;
}
