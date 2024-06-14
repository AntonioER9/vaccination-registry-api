import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'User ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'test@gmail.com',
        description: 'User Email',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: 'Abc123',
        description: 'User Password',
    })
    @Column('text', { 
        select: false //when we make queries it will not return the field
    })
    password: string;

    @ApiProperty({
        example: 'Juan Reyes',
        description: 'User name',
        nullable: true
      })
    @Column('text', {
        nullable: true
    })
    name: string;

    //Triggers
    @BeforeInsert()
    checkFieldsBeforeInsert() { //Always leave the email in lowercase when is create it
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
