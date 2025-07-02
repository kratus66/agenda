// src/memos/memos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { Memo } from './memoEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemosController],
  providers: [MemosService],
  exports: [MemosService],
})
export class MemosModule {}

