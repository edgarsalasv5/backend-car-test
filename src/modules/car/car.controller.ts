import {
  Controller,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Res,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CarService } from './car.service';
import { CarUpdateDto } from './dto/car-update-dto';
import { CarCreateDto } from './dto/car-create-dto';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CarFindDto, filterOptionsDto } from './dto/car-find-dto';

@Controller('car')
@ApiTags('Cars')
@ApiSecurity('Authorization')
export class CarController {
  constructor(private carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(
    @Res() res: Response,
    @User('id') userId: number,
    @Body() carDto: CarCreateDto,
  ) {
    const payload = await this.carService.createOne(userId, carDto);
    return res.status(200).json(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res: Response) {
    const cars = await this.carService.getAll();
    return res.status(200).json(cars);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find/:id')
  async getOne(@Res() res: Response, @Param('id') id: string) {
    const car = await this.carService.getById(id);
    return res.status(200).json(car);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/filter')
  async filterCars(@Res() res: Response, @Query() query: CarFindDto) {
    const { brand, model, car_identification, color, status } = query;
    const filter: filterOptionsDto = {};
    if (brand) filter.brand = brand.toLowerCase();
    if (model) filter.model = Number(model);
    if (color) filter.color = color;
    if (status) filter.status = status === 'true';
    if (car_identification)
      filter.car_identification = car_identification.toUpperCase();

    const cars = await this.carService.seachByFilter(filter);

    return res.status(200).json(cars);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOne(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() carDto: CarUpdateDto,
  ) {
    const payload = await this.carService.updateOne(id, carDto);
    return res.status(200).json(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteOne(@Res() res: Response, @Param('id') id: string) {
    await this.carService.deleteOne(id);
    return res.status(200).json({ message: 'Se elimino correctamente' });
  }
}
