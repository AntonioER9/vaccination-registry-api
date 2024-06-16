export const mockDrugsService = {
  create: jest.fn(dto => ({ id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6', ...dto })),
  findAll: jest.fn(() => [
    {
      id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      name: 'Morfina',
      approved: true,
      max_dose: 3,
      min_dose: 1,
      available_at: new Date('2024-06-14'),
    },
    {
      id: 'a436911f-d92f-4c41-bb93-0597e491da61',
      name: 'Insulina',
      approved: true,
      max_dose: 3,
      min_dose: 1,
      available_at: new Date('2024-06-14'),
    },
  ]),
  findOne: jest.fn(id => (
    {
      id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      name: 'Morfina',
      approved: true,
      max_dose: 3,
      min_dose: 1,
      available_at: new Date('2024-06-14'),
    }
  )),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ id })),
};

export const mockDrugRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
};