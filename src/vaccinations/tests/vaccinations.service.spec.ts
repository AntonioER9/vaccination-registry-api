// import { BadRequestException, NotFoundException } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from "@nestjs/passport";
// import { Test, TestingModule } from "@nestjs/testing";
// import { getRepositoryToken } from "@nestjs/typeorm";
// import { PaginationDto } from "src/common/dtos/pagination.dto";
// import { DrugsService } from "src/drugs/drugs.service";
// import { CreateDrugDto } from "src/drugs/dto/create-drug.dto";
// import { UpdateDrugDto } from "src/drugs/dto/update-drug.dto";
// import { Drug } from "src/drugs/entities/drug.entity";
// import { mockDrugRepository } from "src/drugs/tests/__mocks__/drugs.service";
// import { dummyId, mockDrugDto, mockDrugEntity, mockDrugsEntity } from "src/drugs/tests/models/drug.model";
// import { Repository } from "typeorm";

// describe('DrugsService with data', () => {
//   let service: DrugsService;
//   let repository: Repository<Drug>

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         PassportModule.register({ defaultStrategy: 'jwt' }),
//         JwtModule.register({
//           secret: 'your-secret-key', 
//           signOptions: { expiresIn: '60s' },
//         }),
//       ],
//       providers: [
//         DrugsService,
//         {
//           provide: getRepositoryToken(Drug),
//           useValue: mockDrugRepository,
//         }
//       ],
//     }).compile();

//     service = module.get<DrugsService>(DrugsService);
//     repository = module.get<Repository<Drug>>(getRepositoryToken(Drug));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a drug', async () => {
//       const createDrugDto: CreateDrugDto = mockDrugDto;
//       const drug = mockDrugEntity;

//       mockDrugRepository.create.mockReturnValue(drug);
//       mockDrugRepository.save.mockResolvedValue(drug);

//       const result = await service.create(createDrugDto);
//       expect(result).toEqual(drug);
//       expect(mockDrugRepository.create).toHaveBeenCalledWith(createDrugDto);
//       expect(mockDrugRepository.save).toHaveBeenCalledWith(drug);
//     });

//     it('should handle database errors', async () => {
//       const createDrugDto: CreateDrugDto = mockDrugDto;
//       mockDrugRepository.save.mockRejectedValue({ code: '23505', detail: 'Duplicate entry' });

//       await expect(service.create(createDrugDto)).rejects.toThrow(BadRequestException);
//     });
//   });


//   describe('findOne', () => {
//     it('should return a drug by ID', async () => {
//       const drugEntity = mockDrugEntity;
//       mockDrugRepository.findOneBy.mockResolvedValue(drugEntity);

//       const result = await service.findOne(dummyId);
//       expect(result).toEqual(drugEntity);
//       expect(mockDrugRepository.findOneBy).toHaveBeenCalledWith({ id: dummyId });
//     });

//     it('should throw NotFoundException if drug not found', async () => {
//       mockDrugRepository.findOneBy.mockResolvedValue(null);

//       await expect(service.findOne(dummyId)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('findAll', () => {
//     it('should return an array of drugs', async () => {
//       const drugs = mockDrugsEntity;
//       mockDrugRepository.find.mockResolvedValue(drugs);

//       const paginationDto: PaginationDto = { limit: 10, offset: 0 };
//       const result = await service.findAll(paginationDto);
//       expect(result).toEqual(drugs);
//       expect(mockDrugRepository.find).toHaveBeenCalledWith({ take: paginationDto.limit, skip: paginationDto.offset });
//     });
//   });

//   describe('update', () => {
//     it('should update a drug', async () => {
//       const updateDrugDto: UpdateDrugDto = { name: 'Tramadol' };
//       const drug = { id: dummyId, ...updateDrugDto };
//       mockDrugRepository.preload.mockResolvedValue(drug);
//       mockDrugRepository.save.mockResolvedValue(drug);
//       mockDrugRepository.findOneBy.mockResolvedValue(drug);

//       const result = await service.update(dummyId, updateDrugDto);
//       expect(result).toEqual(drug);
//       expect(mockDrugRepository.preload).toHaveBeenCalledWith({ id: dummyId, ...updateDrugDto });
//       expect(mockDrugRepository.save).toHaveBeenCalledWith(drug);
//     });

//     it('should throw NotFoundException if drug not found', async () => {
//       const updateDrugDto: UpdateDrugDto = { name: 'Tramadol' };
//       mockDrugRepository.preload.mockResolvedValue(null);

//       await expect(service.update(dummyId, updateDrugDto)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a drug', async () => {
//       const drug = { id: dummyId, name: 'Morfina' };
//       mockDrugRepository.findOneBy.mockResolvedValue(drug);
//       mockDrugRepository.remove.mockResolvedValue(drug);

//       await service.remove(dummyId);
//       expect(mockDrugRepository.findOneBy).toHaveBeenCalledWith({ id: dummyId });
//       expect(mockDrugRepository.remove).toHaveBeenCalledWith(drug);
//     });

//     it('should throw NotFoundException if drug not found', async () => {
//       mockDrugRepository.findOneBy.mockResolvedValue(null);

//       await expect(service.remove(dummyId)).rejects.toThrow(NotFoundException);
//     });
//   });

// });