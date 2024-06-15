import { Module } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsController } from './vaccinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { Drug } from 'src/drugs/entities/drug.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DrugsService } from 'src/drugs/drugs.service';

@Module({
  controllers: [VaccinationsController],
  providers: [VaccinationsService, DrugsService],
  imports: [
    TypeOrmModule.forFeature([Vaccination, Drug]),
    AuthModule,
  ],
  exports: [
    VaccinationsService,
    TypeOrmModule,
  ]
})
export class VaccinationsModule {}
