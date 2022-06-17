import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { UsersEntity } from './modules/user/dto/user.entity';
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
      entities: [UsersEntity],
    }),
    CarModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
