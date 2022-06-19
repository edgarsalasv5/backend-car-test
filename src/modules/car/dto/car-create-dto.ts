import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CarCreateDto {
  @ApiProperty({ type: String })
  @IsString()
  brand: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  model: number;

  @ApiProperty({ type: String })
  @IsNumber()
  car_identification: string;

  @ApiProperty({ type: String })
  @IsString()
  color: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  assigned_id: number;
}
