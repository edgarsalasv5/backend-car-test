import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './dto/car.schema';
import { NotFoundException } from '@nestjs/common';
import { CarUpdateDto } from './dto/car-update-dto';
import { CarCreateDto } from './dto/car-create-dto';
import { filterOptionsDto } from './dto/car-find-dto';

export class CarService {
  constructor(
    @InjectModel(Car.name)
    private carEntity: Model<CarDocument>,
  ) {}

  async getAll() {
    return await this.carEntity.find().exec();
  }

  async getById(id: string) {
    const carFound = await this.carEntity.findOne({ _id: id }).exec();

    if (carFound) return carFound;
    throw new NotFoundException('El carro no se encuentra registrado');
  }

  async createOne(userId: number, carDto: CarCreateDto) {
    const newCar = new this.carEntity({
      ...carDto,
      created_id: userId,
    });

    return await newCar.save();
  }

  async updateOne(id: string, carDto: CarUpdateDto) {
    const car = this.getById(id);
    const updateCar = Object.assign(car, carDto);
    return await this.carEntity.updateOne({ _id: id }, updateCar);
  }

  async deleteOne(id: string) {
    return await this.carEntity.deleteOne({ _id: id });
  }

  async seachByFilter(query: filterOptionsDto) {
    return await this.carEntity.find(query).exec();
  }
}
