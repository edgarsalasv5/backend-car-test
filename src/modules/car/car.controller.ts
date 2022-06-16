import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './dto/car.schema';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('car')
export class CarController {
  constructor(@InjectModel(Car.name) private carEntity: Model<CarDocument>) {}

  @Get('/all')
  async getAll() {
    return await this.carEntity.find().exec();
  }

  @Post()
  async createOne() {
    const newCar = new this.carEntity({
      model: 2020,
      color: 'verde',
      brand: 'susan',
      created_id: 12,
      assigned_id: 12,
    });

    const car = await newCar.save();
    return car;
  }
}
