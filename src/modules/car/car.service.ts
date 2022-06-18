import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './dto/car.schema';
import { NotFoundException } from '@nestjs/common';
import { UpdateCarDto } from './dto/update-dto';

export class CarService {
  constructor(@InjectModel(Car.name) private carEntity: Model<CarDocument>) {}

  async getAll() {
    return await this.carEntity.find().exec();
  }

  async getById(id: number) {
    const carFound = await this.carEntity
      .findOne({ where: { _id: id } })
      .exec();

    if (carFound) return carFound;
    throw new NotFoundException('El carro no se encuentra registrado');
  }

  async updateOne(id: number, carDto: UpdateCarDto) {
    const car = this.getById(id);
    const updateCar = Object.assign(car, carDto);
    return await this.carEntity.updateOne({ _id: id }, updateCar);
  }
}
