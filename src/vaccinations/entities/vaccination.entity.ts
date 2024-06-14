import { Drug } from 'src/drugs/entities/drug.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaccinations')
export class Vaccination {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string;

    @Column('int')
    dose: number;

    @Column('date')
    date: Date;

    @ManyToOne(
      () => Drug,
      (drug) => drug.id,
      { onDelete: 'CASCADE' }
    )
    drug: Drug
    
}