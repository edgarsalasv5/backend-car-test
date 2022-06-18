import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.getByEmail(email);
    const valid = await user.validatePassword(password);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');
    return user;
  }

  async generateAccessToken(email: string) {
    const user = await this.userService.getByEmail(email);
    const payload = { userId: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUserAndToken(userDto: SignUpDTO) {
    const user = await this.userService.createUser(userDto);
    const { access_token } = await this.generateAccessToken(user.email);

    return {
      user,
      access_token,
    };
  }
}
