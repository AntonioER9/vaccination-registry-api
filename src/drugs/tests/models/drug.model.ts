// import { MockModel } from 'common/models/mock.model';
import { MockModel } from 'src/common/models/mock.model';
import { Drug } from 'src/drugs/entities/drug.entity';

export const mockDrug: Drug = {
  id: '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6',
  name: 'Morfina',
  approved: true,
  max_dose: 3,
  min_dose: 1,
  available_at: new Date(),
};

export class DrugModel extends MockModel<Drug> {
  protected entityStub = mockDrug;
}

export class DrugModelNull extends MockModel<undefined> {
  protected entityStub = undefined;
}

export const dummyId = '6a3a6c18-2197-4f27-8e44-e8c87cd1d5a6'