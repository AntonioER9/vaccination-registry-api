import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from 'src/drugs/entities/drug.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class DrugsService {

  constructor(
    @InjectRepository(Drug)
    private readonly drugRepository: Repository<Drug>,
  ) { }

  async create(createDrugDto: CreateDrugDto) {

    try {
      const drug = this.drugRepository.create(createDrugDto);

      await this.drugRepository.save(drug);

      return {...drug};

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const drugs = await this.drugRepository.find({
      take: limit,
      skip: offset,
    })

    return drugs;

  }

  async findOne(term: string) {

    let drug: Drug;

    if (isUUID(term)) {
      drug = await this.drugRepository.findOneBy({ id: term });
    } 

    if (!drug)
      throw new NotFoundException(`Drug with ${term} not found`);

    return drug;
  }

  async update( id: string, updateDrugDto: UpdateDrugDto ) {

    const { ...toUpdate } = updateDrugDto;

    const drug = await this.drugRepository.preload({ id, ...toUpdate });

    if ( !drug ) throw new NotFoundException(`drug with id: ${ id } not found`);

    try {

      await this.drugRepository.save( drug );

      return this.findOne( id );
      
    } catch (error) {

      this.handleDBErrors(error);
    }

  }

  async remove(id: string) {
    const drug = await this.findOne(id);
    await this.drugRepository.remove(drug);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
