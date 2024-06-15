import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DrugsService } from "src/drugs/drugs.service";
import { Drug } from "src/drugs/entities/drug.entity";
import { DrugModel, dummyId, mockDrug } from "src/drugs/tests/models/drug.model";
import { Repository } from "typeorm";

describe('DrugsService with data', () => {
  let service: DrugsService;
  let model: Repository<Drug>

const mockDrugService = {
  findOneBy: jest.fn()
}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrugsService,
        {
          provide: getRepositoryToken(Drug),
          useValue: mockDrugService,
        }
      ],
    }).compile();

    service = module.get<DrugsService>(DrugsService);
    model = module.get<Repository<Drug>>(getRepositoryToken(Drug));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => { 

    it('should be defined', async () => {
      jest.spyOn(model,'findOneBy').mockResolvedValue(mockDrug);

      const result = await service.findOne(mockDrug.id);

      expect(model.findOneBy).toHaveBeenCalled();
      expect(result).toEqual(mockDrug);
    });

    it('should throw NotFoundException if invalid ID', async() => {

      const id = 'invalid-id';

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);

    
    }); 

  })


});