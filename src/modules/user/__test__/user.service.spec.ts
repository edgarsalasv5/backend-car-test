import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpDTO } from 'src/modules/auth/dto/signup-dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(userService).toBeDefined();
  });

  describe('User methods', () => {
    it('should create a user', async () => {
      const userDto: SignUpDTO = {
        name: 'jest-user',
        email: 'jest-user@test.com',
        password: '123jest123',
      };

      try {
        await userService.createUser(userDto);
        expect(userRepository.create).toHaveBeenCalledWith(userDto);
      } catch (err: any) {
        console.log(err);
      }
    });

    it('should return a error of not found user', async () => {
      const email = 'noexistemail-123@gmailnotexist.com';
      const error = new NotFoundException('Usuario no registrado');

      try {
        await userService.getByEmail(email);
      } catch (err: any) {
        expect(err).toStrictEqual(error);
      }
    });

    it('should return to correct user', async () => {
      const email = 'user@gmail';

      try {
        await userService.getByEmail(email);
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { email },
        });
      } catch (err) {
        console.log('should return to correct user: ', err.message);
      }
    });
  });
});
