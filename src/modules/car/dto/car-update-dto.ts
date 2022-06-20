import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CarUpdateDto {
  @ApiProperty({ type: String })
  @IsString()
  brand: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  model: number;

  @ApiProperty({ type: String })
  @IsString()
  car_identification: string;

  @ApiProperty({ type: String })
  @IsString()
  color: string;

  @ApiProperty({ type: String })
  @IsString()
  input_date: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  assigned_id: number;
}
