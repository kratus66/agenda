import { Module } from '@nestjs/common';
import {typeOrmConfig } from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MemosModule } from './memos/memo.module';
import { MemosController } from './memos/memos.controller';
import { AlertModule } from './alerts/alert.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule, 
    MemosModule, 
    AlertModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
