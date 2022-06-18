import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  describe('Auth Service Methods', () => {
    it('should call correctly every funtion', async () => {
      try {
        const response = await authService.validateUser(
          'user@gmail.com',
          '123123',
        );
        if (response) {
          expect(response.email).toEqual('user@gmail.com');
        }
      } catch (err) {
        const errorResponse = new NotFoundException('Usuario no registrado');
        expect(err).toEqual(errorResponse);
      }
    });
  });
});
