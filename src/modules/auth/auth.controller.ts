import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin-dto';
import { SignUpDTO } from './dto/signup-dto';
import { UsersEntity } from '../user/dto/user.entity';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('sigin')
  async signin(@Body() credentials: SignInDTO) {
    const { email, password } = credentials;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.generateAccessToken(email);
    return {
      user,
      ...token,
    };
  }

  @Post('signup')
  async signup(@Body() { email, name, password }: SignUpDTO) {
    const userFound = await UsersEntity.findOne({ where: { email } });
    if (userFound) throw new BadRequestException('Este usuario ya exisiste');

    const createUser = UsersEntity.create({
      name: name,
      email: email,
      password: password,
    });

    const user = await UsersEntity.save(createUser);
    const token = await this.authService.generateAccessToken(email);
    return {
      user,
      ...token,
    };
  }
}
