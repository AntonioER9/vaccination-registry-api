import { ApiProperty } from '@nestjs/swagger';
import { Vaccination } from 'src/vaccinations/entities/vaccination.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drugs')
export class Drug {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string;

    @Column('bool')
    approved: boolean;

    @Column('int')
    min_dose: number;

    @Column('int')
    max_dose: number;

    @Column('date')
    available_at: Date;
    
    @OneToMany(
      () => Vaccination,
      (vaccination) => vaccination.drug,
    )
    vaccination?: Vaccination;

}