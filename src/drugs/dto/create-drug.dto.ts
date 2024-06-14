import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateDrugDto {


  @ApiProperty({
    description: 'Drug name',
    nullable: false,
    minLength: 1
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Drug approved',
    nullable: false,
  })
  @IsBoolean()
  approved: boolean;

  @ApiProperty({
    description: 'Drug min dose',
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  min_dose: number;
  
  @ApiProperty({
    description: 'Drug max dose',
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  max_dose: number;
  
  @ApiProperty({
    description: 'Drug available at date'
  })
  @IsDateString()
  available_at: Date;

}