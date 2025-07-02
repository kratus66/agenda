import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { User } from '../auth/UserEntity';


import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Memo } from "src/memos/memoEntity";

config(); // Lee variables del .env
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema:false,
  logging: true,
    entities: [User, Memo],
    subscribers: [],
    migrations: [],
};