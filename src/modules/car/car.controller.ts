import {
  Controller,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CarService } from './car.service';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateCarDto } from './dto/update-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAll(@Res() res: Response) {
    const cars = await this.carService.getAll();
    return res.status(200).json(cars);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOne(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() carDto: UpdateCarDto,
  ) {
    const payload = await this.carService.updateOne(id, carDto);
    return res.status(200).json(payload);
  }
}
