import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from './auth/auth.module';
import { DrugsModule } from './drugs/drugs.module';
import { VaccinationsModule } from './vaccinations/vaccinations.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //sincronización automatica de filas o columnas ojo en PROD
    }),
    CommonModule,
    AuthModule,
    DrugsModule,
    VaccinationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
