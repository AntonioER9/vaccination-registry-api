import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseUUIDPipe } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { Auth } from 'src/auth/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Vaccinations')
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Vaccination was created', type: Vaccination  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createVaccinationDto: CreateVaccinationDto,
  ) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.vaccinationsService.findAll(paginationDto);
  }

  @Put(':id')
  @Auth()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vaccinationsService.remove(id);
  }
}
