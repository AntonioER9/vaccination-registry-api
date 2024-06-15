import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateVaccinationDto {


  @ApiProperty({
    description: 'Name of the person who will be vaccinated',
    nullable: false,
    minLength: 1
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Vaccination dose'
  })
  @IsNumber()
  @IsPositive()
  dose: number;

  @ApiProperty({
    description: 'Vaccination date'
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'Drug Id'
  })
  @IsString()
  drugId: string;
}