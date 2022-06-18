import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiProperty({ type: String })
  @IsString()
  brand: string;

  @ApiProperty({ type: Number })
  @IsString()
  model: number;

  @ApiProperty({ type: String })
  @IsString()
  color: string;

  @ApiProperty({ type: Boolean })
  @IsString()
  status: boolean;

  @ApiProperty({ type: Number })
  @IsString()
  assigned_id: number;
}
