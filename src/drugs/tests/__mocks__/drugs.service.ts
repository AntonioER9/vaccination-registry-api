import { DrugModel } from 'src/drugs/tests/models/drug.model';
export const DrugsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(DrugModel),
});
