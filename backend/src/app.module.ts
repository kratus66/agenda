import { Module } from '@nestjs/common';
import {typeOrmConfig } from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MemosModule } from './memos/memo.module';
import { MemosController } from './memos/memos.controller';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule, 
    MemosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
