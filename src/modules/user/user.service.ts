import { UsersEntity } from './dto/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getByEmail(email: string) {
    const user = await UsersEntity.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no registrado');
    return user;
  }

  async getById(id: number) {
    const user = await UsersEntity.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no registrado');
    delete user.password;
    return user;
  }
}
