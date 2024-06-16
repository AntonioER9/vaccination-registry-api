import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/auth/dto';
import { mockAuthService } from 'src/auth/tests/__mocks__/auth.service';
import { mockCreateUserDto, mockLoginUserResponse, mockLoginUserDto, mockCreateUserResponse } from 'src/auth/tests/models/auth.model';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = mockCreateUserDto;

      expect(await controller.createUser(createUserDto)).toEqual({
        id: expect.any(String),
        name: mockCreateUserResponse.name,
        email: mockCreateUserResponse.email,
        token: mockCreateUserResponse.token
      });

      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('loginUser', () => {
    it('should login a user', async () => {
      const loginUserDto: LoginUserDto = mockLoginUserDto;

      expect(await controller.loginUser(loginUserDto)).toEqual(mockLoginUserResponse);

      expect(service.login).toHaveBeenCalledWith(loginUserDto);
    });
  });
});
