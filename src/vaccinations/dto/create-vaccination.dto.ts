import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateVaccinationDto {


  @ApiProperty({
    description: 'Drug name',
    nullable: false,
    minLength: 1
  })
  @IsString()
  name: string;

  @IsString()
  drug_id: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  dose: number;
  
  @ApiProperty({
    description: ''
  })
  @IsDateString()
  date: Date;

}