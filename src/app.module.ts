import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './modules/car/car.module';
import { User } from './modules/user/dto/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 5432,
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'password',
      database: 'carpulpodb',
      synchronize: true,
      autoLoadEntities: true,
      entities: [User],
    }),
    CarModule,
    UserModule,
  ],
})
export class AppModule {}
