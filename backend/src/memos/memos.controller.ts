// src/memos/memos.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { MemosService } from './memos.service';
import { CreateMemoDto } from './cretateMemoDto';

@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Post()
  create(@Body() createMemoDto: CreateMemoDto) {
    return this.memosService.create(createMemoDto);
  }
}

