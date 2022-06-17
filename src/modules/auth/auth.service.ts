import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../user/dto/user.entity';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UsersEntity> {
    const user = await this.usersService.getByEmail(email);
    const valid = await user.validatePassword(password);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');
    return user;
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.getByEmail(email);
    const payload = { userId: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
