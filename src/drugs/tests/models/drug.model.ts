import { CreateDrugDto } from 'src/drugs/dto/create-drug.dto';
import { Drug } from 'src/drugs/entities/drug.entity';

export const mockDrugEntity: Drug = {
  id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
  name: 'Morfina',
  approved: true,
  max_dose: 3,
  min_dose: 1,
  available_at: new Date('2024-06-14'),
};

export const mockDrugDisapprovedEntity: Drug = {
  id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
  name: 'Morfina',
  approved: false,
  max_dose: 3,
  min_dose: 1,
  available_at: new Date('2024-06-14'),
};

export const dummyId = '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6';

export const mockDrugDto: CreateDrugDto = {
  name: 'Morfina',
  approved: true,
  max_dose: 3,
  min_dose: 1,
  available_at: new Date('2024-06-14')
}

export const mockDrugsEntity: Drug[] = [
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
];