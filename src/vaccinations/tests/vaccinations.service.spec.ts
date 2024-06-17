import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrugsService } from 'src/drugs/drugs.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Drug } from 'src/drugs/entities/drug.entity';
import { mockDrugsService, mockVaccinationRepository } from 'src/vaccinations/tests/__mocks__/vaccinations.service';
import { CreateVaccinationDto } from 'src/vaccinations/dto/create-vaccination.dto';
import { dummyVaccinationId, mockVaccinationDto, mockVaccinationEntity, mockVaccinationsEntity } from 'src/vaccinations/tests/models/vaccination.model';
import { VaccinationsService } from 'src/vaccinations/vaccinations.service';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { mockDrugEntity } from 'src/drugs/tests/models/drug.model';
import { UpdateVaccinationDto } from 'src/vaccinations/dto/update-vaccination.dto';


describe('VaccinationsService', () => {
  let service: VaccinationsService;
  let vaccinationRepository;
  let drugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaccinationsService,
        { provide: getRepositoryToken(Vaccination), useValue: mockVaccinationRepository() },
        { provide: DrugsService, useValue: mockDrugsService() },
      ],
    }).compile();

    service = module.get<VaccinationsService>(VaccinationsService);
    vaccinationRepository = module.get<Repository<Vaccination>>(getRepositoryToken(Vaccination));
    drugsService = module.get<DrugsService>(DrugsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a vaccination', async () => {
      const createVaccinationDto: CreateVaccinationDto = mockVaccinationDto;

      const savedVaccination = {
        id: dummyVaccinationId,
        ...createVaccinationDto,
      };    
      drugsService.findOne.mockResolvedValue(mockDrugEntity);
      vaccinationRepository.create.mockReturnValue(savedVaccination);
      vaccinationRepository.save.mockResolvedValue(savedVaccination);
      
      const result = await service.create(createVaccinationDto);
      expect(result).toEqual(savedVaccination);
      expect(drugsService.findOne).toHaveBeenCalledWith(createVaccinationDto.drugId);
      expect(vaccinationRepository.save).toHaveBeenCalledWith(savedVaccination);
    });
  });

  describe('findOne', () => {
    it('should return a vaccination if found', async () => {
      const vaccination = mockVaccinationEntity;
      vaccinationRepository.findOneBy.mockResolvedValue(vaccination);

      const result = await service.findOne(dummyVaccinationId);
      expect(result).toEqual(vaccination);
      expect(vaccinationRepository.findOneBy).toHaveBeenCalledWith({ id: dummyVaccinationId });
    });

    it('should throw a NotFoundException if vaccination is not found', async () => {
      vaccinationRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('some-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of vaccinations', async () => {
      const vaccinations = mockVaccinationsEntity;
      vaccinationRepository.find.mockResolvedValue(vaccinations);

      const paginationDto = { limit: 10, offset: 0 };
      const result = await service.findAll(paginationDto);
      expect(result).toEqual(vaccinations);
      expect(vaccinationRepository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
    });
  });

  describe('update', () => {
    it('should update a vaccination', async () => {
      const updateVaccinationDto: UpdateVaccinationDto = { name: 'test' };
      const existingVaccination = { id: dummyVaccinationId, name: 'Vaccine1' };
      const updatedVaccination = { id: dummyVaccinationId, ...updateVaccinationDto };

      vaccinationRepository.preload.mockResolvedValue(existingVaccination);
      vaccinationRepository.save.mockResolvedValue(updatedVaccination);
      service.findOne = jest.fn().mockResolvedValue(updatedVaccination);

      const result = await service.update(dummyVaccinationId, updateVaccinationDto);
      expect(result).toEqual(updatedVaccination);
      expect(vaccinationRepository.preload).toHaveBeenCalledWith({ id: dummyVaccinationId, ...updateVaccinationDto });
      expect(vaccinationRepository.save).toHaveBeenCalledWith(existingVaccination);
    });

    it('should throw a NotFoundException if vaccination is not found', async () => {
      vaccinationRepository.preload.mockResolvedValue(null);

      await expect(service.update(dummyVaccinationId, {} as UpdateVaccinationDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a vaccination', async () => {
      const vaccination = { id: dummyVaccinationId, name: 'test' };
      service.findOne = jest.fn().mockResolvedValue(vaccination);
      vaccinationRepository.remove.mockResolvedValue(vaccination);

      const result = await service.remove(dummyVaccinationId);
      expect(result).toBeUndefined();
      expect(service.findOne).toHaveBeenCalledWith(dummyVaccinationId);
      expect(vaccinationRepository.remove).toHaveBeenCalledWith(vaccination);
    });

    it('should throw a NotFoundException if vaccination is not found', async () => {
      service.findOne = jest.fn().mockRejectedValue(new NotFoundException());

      await expect(service.remove('some-id')).rejects.toThrow(NotFoundException);
    });
  });
});
