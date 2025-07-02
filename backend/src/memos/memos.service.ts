// src/memos/memos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './memoEntity';
import { CreateMemoDto } from './cretateMemoDto';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}

  async create(createMemoDto: CreateMemoDto): Promise<Memo> {
    const memo = this.memoRepository.create(createMemoDto);
    return await this.memoRepository.save(memo);
  }
}

