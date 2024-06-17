export const mockAuthService = {
  create: jest.fn(dto => ({
    id: '68904c9c-5f53-4ae4-b65d-ff60b425ac9f',
    name: dto.name,
    email: dto.email,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTA0YzljLTVmNTMtNGFlNC1iNjVkLWZmNjBiNDI1YWM5ZiIsImlhdCI6MTcxODU1MjExNCwiZXhwIjoxNzE4NTU1NzE0fQ.rRra1n7jNScD9sDcqCx331ESonsnMM0rvp6vC2zXCuA'
  })),
  login: jest.fn(dto => ({
    id: '68904c9c-5f53-4ae4-b65d-ff60b425ac9f',
    email: dto.email,
    name: 'test',
    password:'$2b$10$xIiq07hQOp12OOXNsrg9Me1XkPmTp.UOBm7i/nqgIZoqkn1uyNEK.',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTA0YzljLTVmNTMtNGFlNC1iNjVkLWZmNjBiNDI1YWM5ZiIsImlhdCI6MTcxODU1MjExNCwiZXhwIjoxNzE4NTU1NzE0fQ.rRra1n7jNScD9sDcqCx331ESonsnMM0rvp6vC2zXCuA'
  })),
};

export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

export const mockJwtService = {
  sign: jest.fn(),
};

