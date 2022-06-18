import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDTO } from '../auth/dto/signup-dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no registrado');
    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no registrado');
    delete user.password;
    return user;
  }

  async createUser({ name, email, password }: SignUpDTO) {
    const userFound = await this.userRepository.findOne({ where: { email } });
    if (userFound) throw new BadRequestException('Este usuario ya exisiste');

    const createUser = this.userRepository.create({
      name: name,
      email: email,
      password: password,
    });

    const user = await this.userRepository.save(createUser);
    return user;
  }
}
