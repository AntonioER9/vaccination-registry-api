import { CreateUserDto } from "src/auth/dto";

export const mockCreateUserDto: CreateUserDto = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'Abc123'
}

export const mockLoginUserDto: CreateUserDto = {
  email: 'test@gmail.com',
  password: 'Abc123'
}

export const mockLoginUserResponse = {
  id: '68904c9c-5f53-4ae4-b65d-ff60b425ac9f',
  email: 'test@gmail.com',
  password:'$2b$10$xIiq07hQOp12OOXNsrg9Me1XkPmTp.UOBm7i/nqgIZoqkn1uyNEK.',
  name: 'test',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTA0YzljLTVmNTMtNGFlNC1iNjVkLWZmNjBiNDI1YWM5ZiIsImlhdCI6MTcxODU1MjExNCwiZXhwIjoxNzE4NTU1NzE0fQ.rRra1n7jNScD9sDcqCx331ESonsnMM0rvp6vC2zXCuA' 
}

export const mockCreateUserResponse = {
  id: '68904c9c-5f53-4ae4-b65d-ff60b425ac9f',
  email: 'test@gmail.com',
  name: 'test',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTA0YzljLTVmNTMtNGFlNC1iNjVkLWZmNjBiNDI1YWM5ZiIsImlhdCI6MTcxODU1MjExNCwiZXhwIjoxNzE4NTU1NzE0fQ.rRra1n7jNScD9sDcqCx331ESonsnMM0rvp6vC2zXCuA' 
}

export const mockUserEntity = {
  id: '68904c9c-5f53-4ae4-b65d-ff60b425ac9f',
  name: 'test',
  email: 'test@gmail.com',
  password: '$2b$10$xIiq07hQOp12OOXNsrg9Me1XkPmTp.UOBm7i/nqgIZoqkn1uyNEK.'
};

export const mockHashedPassword = '$2b$10$xIiq07hQOp12OOXNsrg9Me1XkPmTp.UOBm7i/nqgIZoqkn1uyNEK.';

export const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTA0YzljLTVmNTMtNGFlNC1iNjVkLWZmNjBiNDI1YWM5ZiIsImlhdCI6MTcxODU1MjExNCwiZXhwIjoxNzE4NTU1NzE0fQ.rRra1n7jNScD9sDcqCx331ESonsnMM0rvp6vC2zXCuA';

