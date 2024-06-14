import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  @Auth()
  create(
    @Body() createVaccinationDto: CreateVaccinationDto,
    @GetUser() user: User,
  ) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get()
  findAll() {
    return this.vaccinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsService.update(+id, updateVaccinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationsService.remove(+id);
  }
}
