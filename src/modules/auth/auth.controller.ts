import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin-dto';
import { SignUpDTO } from './dto/signup-dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Res() res: Response, @Body() credentials: SignInDTO) {
    const { email, password } = credentials;
    const user = await this.authService.validateUser(email, password);
    const { access_token } = await this.authService.generateAccessToken(email);
    return res.status(200).json({ user, access_token });
  }

  @Post('signup')
  async signup(@Res() res: Response, @Body() credentials: SignUpDTO) {
    const payload = await this.authService.createUserAndToken(credentials);
    return res.status(200).json(payload);
  }
}
