import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { mockJwtService, mockUserRepository } from 'src/auth/tests/__mocks__/auth.service';
import { CreateUserDto } from 'src/auth/dto';
import { mockCreateUserDto, mockCreateUserResponse, mockHashedPassword, mockJwt, mockUserEntity } from 'src/auth/tests/models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = mockCreateUserDto;
      const hashedPassword = mockHashedPassword;
      const user = mockUserEntity;

      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(mockJwt);

      const result = await service.create(mockCreateUserDto);

      expect(result).toEqual(mockCreateUserResponse);
      // expect(mockUserRepository.create).toHaveBeenCalledWith(user);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should handle database errors', async () => {
      const createUserDto: CreateUserDto = mockCreateUserDto;
      mockUserRepository.save.mockRejectedValue({ code: '23505', detail: 'Duplicate entry' });

      await expect(service.create(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  // describe('login', () => {
  //   it('should login a user', async () => {
  //     const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'test123' };
  //     const user = { id: '1', email: 'test@example.com', name: 'Test', password: 'hashedPassword' };

  //     mockUserRepository.findOne.mockResolvedValue(user);
  //     jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
  //     mockJwtService.sign.mockReturnValue('jwt-token');

  //     const result = await service.login(loginUserDto);
  //     expect(result).toEqual({
  //       id: '1',
  //       email: 'test@example.com',
  //       name: 'Test',
  //       token: 'jwt-token',
  //     });
  //     expect(mockUserRepository.findOne).toHaveBeenCalledWith({
  //       where: { email: 'test@example.com' },
  //       select: { email: true, password: true, id: true, name: true },
  //     });
  //     expect(bcrypt.compareSync).toHaveBeenCalledWith('test123', 'hashedPassword');
  //   });

  //   it('should throw UnauthorizedException if user not found', async () => {
  //     const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'test123' };

  //     mockUserRepository.findOne.mockResolvedValue(null);

  //     await expect(service.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
  //   });

  //   it('should throw UnauthorizedException if password is invalid', async () => {
  //     const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'test123' };
  //     const user = { id: '1', email: 'test@example.com', name: 'Test', password: 'hashedPassword' };

  //     mockUserRepository.findOne.mockResolvedValue(user);
  //     jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

  //     await expect(service.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
  //   });
  // });
});
