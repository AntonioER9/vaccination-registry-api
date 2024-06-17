import { CreateDrugDto } from 'src/drugs/dto/create-drug.dto';
import { Drug } from 'src/drugs/entities/drug.entity';
import { CreateVaccinationDto } from 'src/vaccinations/dto/create-vaccination.dto';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';

export const mockVaccinationEntity: Vaccination = {

  id: '15464723-6d93-4a37-9c57-30a41a2edf34',
  name: 'test test',
  dose: 2,
  date: new Date('2024-06-14'),
  drug: {
      id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
      name: 'test',
      approved: true,
      min_dose: 1,
      max_dose: 3,
      available_at: new Date("2024-06-14")
  },
};

export const dummyVaccinationId = '15464723-6d93-4a37-9c57-30a41a2edf34';

export const mockVaccinationDto: CreateVaccinationDto = {
  name: 'test',
  dose: 2,
  drugId: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
  date: new Date('2024-06-14')
}

export const mockVaccinationsEntity: Vaccination[] = [
  {
    id: '15464723-6d93-4a37-9c57-30a41a2edf34',
    name: 'test test',
    dose: 2,
    date: new Date('2024-06-14'),
    drug: {
        id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
        name: 'test',
        approved: true,
        min_dose: 1,
        max_dose: 3,
        available_at: new Date("2024-06-14")
    },
  },
  {
    id: '15464723-6d93-4a37-9c57-30a41a2edf34',
    name: 'test2 test2',
    dose: 2,
    date: new Date('2024-06-14'),
    drug: {
        id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
        name: 'test',
        approved: true,
        min_dose: 1,
        max_dose: 3,
        available_at: new Date("2024-06-14")
    },
  },
];