import { dummyId } from "src/drugs/tests/models/drug.model";
import { dummyVaccinationId } from "src/vaccinations/tests/models/vaccination.model";

export const mockVaccinationsService = {
  create: jest.fn(dto => ({
    id: dummyVaccinationId,
    ...dto
  })),
  findAll: jest.fn(() => [
    {
      name: 'test',
      dose: 2,
      drugId: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      date: new Date('2024-06-14')
    },
    {
      name: 'test2',
      dose: 2,
      drugId: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      date: new Date('2024-06-14')
    },
  ]),
  update: jest.fn((id, dto) => ({
    id,
    ...dto,
  })),
  remove: jest.fn(id => ({ id })),
};

export const mockVaccinationRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

export const mockDrugsService = () => ({
  findOne: jest.fn(id => (
    {
      id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      name: 'Morfina',
      approved: true,
      max_dose: 3,
      min_dose: 1,
      available_at: new Date('2024-06-14'),
    }
  ))
});