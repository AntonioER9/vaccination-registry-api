import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Drug } from 'src/drugs/entities/drug.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Drugs')
@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Drug was created', type: Drug })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createDrugDto: CreateDrugDto,
  ) {
    return this.drugsService.create(createDrugDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.drugsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.drugsService.findOne(id);
  }

  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(id, updateDrugDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.drugsService.remove(id);
  }
}
