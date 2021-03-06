import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop()
  brand: string;

  @Prop()
  model: number;

  @Prop()
  car_identification: string;

  @Prop()
  color: string;

  @Prop()
  input_date: Date;

  @Prop()
  status: boolean;

  @Prop()
  assigned_id: number;

  @Prop()
  created_id: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
