import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig, validationConfigSchema } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationConfigSchema,
    }),
    TypeOrmModule.forRoot({
      port: 5432,
      type: 'postgres',
      host: getConfig().DB_HOST,
      username: getConfig().DB_USER,
      password: getConfig().DB_PASS,
      database: getConfig().DB_NAME,
      synchronize: true,
      entities: [UserEntity],
    }),
    CarModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
