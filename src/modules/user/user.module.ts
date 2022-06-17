import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
