import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateVaccinationDto } from 'src/vaccinations/dto/create-vaccination.dto';
import { UpdateVaccinationDto } from 'src/vaccinations/dto/update-vaccination.dto';
import { mockVaccinationsService } from 'src/vaccinations/tests/__mocks__/vaccinations.service';
import { dummyVaccinationId, mockVaccinationDto } from 'src/vaccinations/tests/models/vaccination.model';
import { VaccinationsController } from 'src/vaccinations/vaccinations.controller';
import { VaccinationsService } from 'src/vaccinations/vaccinations.service';


describe('VaccinationsController', () => {
  let controller: VaccinationsController;
  let service: VaccinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'your-secret-key',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [VaccinationsController],
      providers: [
        {
          provide: VaccinationsService,
          useValue: mockVaccinationsService,
        },
      ],
    })
    .compile();

    controller = module.get<VaccinationsController>(VaccinationsController);
    service = module.get<VaccinationsService>(VaccinationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a vaccination', async () => {
      const dto: CreateVaccinationDto = mockVaccinationDto;
      expect(await controller.create(dto)).toEqual({
        id: dummyVaccinationId,
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of vaccinations', async () => {
      const dto: PaginationDto = { limit: 10, offset: 0 };
      expect(await controller.findAll(dto)).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a vaccination', async () => {
      const dto: UpdateVaccinationDto = { name: 'Updated Vaccine' };
      const id = dummyVaccinationId;
      expect(await controller.update(id, dto)).toEqual({
        id,
        ...dto,
      });
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a vaccination', async () => {
      const id = dummyVaccinationId;
      expect(await controller.remove(id)).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
