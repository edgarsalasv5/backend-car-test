import { Module } from '@nestjs/common';
import { Car, CarSchema } from './dto/car.schema';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:!yRprbqnwUg2cx!@dbcar.w89baqf.mongodb.net/dbCar',
    ),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  ],
  controllers: [CarController],
})
export class CarModule {}
