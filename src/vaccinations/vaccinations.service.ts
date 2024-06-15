import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DrugsService } from 'src/drugs/drugs.service';
import { Drug } from 'src/drugs/entities/drug.entity';

@Injectable()
export class VaccinationsService {

  constructor(
    @InjectRepository(Vaccination)
    private readonly vaccinationRepository: Repository<Vaccination>,
    private readonly drugsService: DrugsService
  ) { }

  async create(createVaccinationDto: CreateVaccinationDto) {

    const { drugId, ...vaccinationDetails } = createVaccinationDto;

    const drug: Drug = await this.drugsService.findOne(drugId);

    this.drugValidation(drug, createVaccinationDto);

    try {

      const vaccination = this.vaccinationRepository.create({
        ...vaccinationDetails,
        drug
      });

      await this.vaccinationRepository.save(vaccination);
      
      return { ...vaccination };

    } catch (error) {
      this.handleDBErrors(error);
    }


  }

  async findOne(term: string) {

    let vaccination: Vaccination;

    if (isUUID(term)) {
      vaccination = await this.vaccinationRepository.findOneBy({ id: term });
    }

    if (!vaccination) throw new NotFoundException(`Vaccination with ${term} not found`);

    return vaccination;
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const vaccinations = await this.vaccinationRepository.find({
      take: limit,
      skip: offset,
    })

    return vaccinations;

  }

  async update(id: string, updateVaccinationDto: UpdateVaccinationDto) {

    const { ...toUpdate } = updateVaccinationDto;

    const vaccination = await this.vaccinationRepository.preload({ id, ...toUpdate });

    if (!vaccination) throw new NotFoundException(`vaccination with id: ${id} not found`);

    try {

      await this.vaccinationRepository.save(vaccination);

      return this.findOne(id);

    } catch (error) {

      this.handleDBErrors(error);
    }

  }

  async remove(id: string) {
    const vaccination = await this.findOne(id);
    await this.vaccinationRepository.remove(vaccination);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }

  drugValidation(drug: Drug, createVaccinationDto: CreateVaccinationDto): boolean {
    const { min_dose, max_dose, available_at } = drug;
    const { dose, date } = createVaccinationDto;

    if (!(dose >= min_dose && dose <= max_dose)) {
      throw new BadRequestException(`Impermissible dose: ${dose}. For drug: ${drug.name}`);
    }

    if (date < available_at) {
      console.log(date);
      console.log(available_at);
      throw new BadRequestException(`Date vaccination is not permitted`);
    }

    return true;
  }

}
