import { Module } from '@nestjs/common';
import { Car, CarSchema } from './dto/car.schema';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarService } from './car.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:!yRprbqnwUg2cx!@dbcar.w89baqf.mongodb.net/dbCar',
    ),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
