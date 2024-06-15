import { Test, TestingModule } from '@nestjs/testing';
import { DrugsController } from '../drugs.controller';
import { DrugsService } from '../drugs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Drug } from 'src/drugs/entities/drug.entity';
import { DrugModel, dummyId, mockDrug } from 'src/drugs/tests/models/drug.model';

describe('DrugsController', () => {
  let controller: DrugsController;
  let service: DrugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugsController],
      providers: [
        {
          provide: DrugsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockDrug),
          },
        },
        {
          provide: getRepositoryToken(Drug),
          useClass: DrugModel
        }
      ],
    }).compile();

    controller = module.get<DrugsController>(DrugsController);
    service = module.get<DrugsService>(DrugsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should findOne return data', async () => {

    expect(await controller.findOne(dummyId)).toEqual(mockDrug);
  });

});
