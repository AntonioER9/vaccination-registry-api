import { Test, TestingModule } from '@nestjs/testing';
import { DrugsController } from '../drugs.controller';
import { DrugsService } from '../drugs.service';
import { dummyId, mockDrugDto, mockDrugEntity } from 'src/drugs/tests/models/drug.model';
import { CreateDrugDto } from 'src/drugs/dto/create-drug.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { mockDrugsService } from 'src/drugs/tests/__mocks__/drugs.service';
import { UpdateDrugDto } from 'src/drugs/dto/update-drug.dto';

describe('DrugsController', () => {
  let controller: DrugsController;
  let service: DrugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugsController],
      providers: [
        {
          provide: DrugsService,
          useValue: mockDrugsService,
        },
      ],
    }).compile();

    controller = module.get<DrugsController>(DrugsController);
    service = module.get<DrugsService>(DrugsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a drug', async () => {
    const createDrugDto: CreateDrugDto = mockDrugDto;
    expect(await controller.create(createDrugDto)).toEqual({
      id: expect.any(String),
      ...createDrugDto,
    });
    expect(service.create).toHaveBeenCalledWith(createDrugDto);
  });

  it('should return an array of drugs', async () => {
    const paginationDto: PaginationDto = { limit: 10, offset: 0 };
    expect(await controller.findAll(paginationDto)).toHaveLength(2);
    expect(service.findAll).toHaveBeenCalledWith(paginationDto);
  });

  it('should return a single drug', async () => {
    const id = dummyId;
    expect(await controller.findOne(id)).toEqual(mockDrugEntity);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a drug', async () => {
    const id = dummyId;
    const updateDrugDto: UpdateDrugDto = { name: 'Tramadol' };
    expect(await controller.update(id, updateDrugDto)).toEqual({
      id,
      ...updateDrugDto,
    });
    expect(service.update).toHaveBeenCalledWith(id, updateDrugDto);
  });

  it('should remove a drug', async () => {
    const id = dummyId;
    expect(await controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });

});
