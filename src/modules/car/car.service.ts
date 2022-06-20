import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
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
    const inputDate = moment(carDto.input_date).format('YYYY-MM-DD');

    const newCar = new this.carEntity({
      ...carDto,
      created_id: userId,
      input_date: inputDate,
    });

    return await newCar.save();
  }

  async updateOne(id: string, carDto: CarUpdateDto) {
    const car = await this.getById(id);
    const inputDate = moment(carDto.input_date).format('YYYY-MM-DD');
    const updateCar = Object.assign(car, { ...carDto, input_date: inputDate });
    await this.carEntity.updateOne({ _id: id }, updateCar);
    return updateCar;
  }

  async deleteOne(id: string) {
    return await this.carEntity.deleteOne({ _id: id });
  }

  async seachByFilter(query: filterOptionsDto) {
    return await this.carEntity.find(query).exec();
  }
}
