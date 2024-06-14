import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/drugs/entities/drug.entity';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DrugsController],
  providers: [DrugsService],
  imports:[
    TypeOrmModule.forFeature([Drug, Vaccination]),
    AuthModule,
  ],
  exports: [
    DrugsService,
    TypeOrmModule,
  ]
})
export class DrugsModule {}
