import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './memoEntity';
import { CreateMemoDto } from './cretateMemoDto';
import { UpdateMemoDto } from './updateMemoDto'; // Asegúrate de tener este archivo

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}

  async create(createMemoDto: CreateMemoDto, userId: string) {
    const memo = this.memoRepository.create({
      ...createMemoDto,
      user: { id: Number(userId) } as any,
    });
    return this.memoRepository.save(memo);
  }

  async findAllByUser(userId: string) {
    return this.memoRepository.find({
      where: { user: { id: Number(userId) } },
      order: { date: 'DESC' },
    });
  }

  async findOneById(id: string, userId: string) {
    const memo = await this.memoRepository.findOne({
      where: { id, user: { id: Number(userId) } },
    });
    if (!memo) throw new NotFoundException('Memo no encontrado');
    return memo;
  }

  async update(id: string, userId: string, updateMemoDto: UpdateMemoDto) {
    const memo = await this.memoRepository.findOne({
      where: { id, user: { id: Number(userId) } },
    });
    if (!memo) throw new NotFoundException('Memo no encontrado');

    // Validación para transformar horaProgramada a Date si viene como string
    let dataToUpdate = { ...updateMemoDto };

    if (updateMemoDto.recordatorio?.horaProgramada) {
   dataToUpdate.recordatorio = {
    ...updateMemoDto.recordatorio,
    horaProgramada: new Date(updateMemoDto.recordatorio.horaProgramada),
  };
}

Object.assign(memo, dataToUpdate);

    return this.memoRepository.save(memo);
  }

  async remove(id: string, userId: string) {
    const memo = await this.memoRepository.findOne({
      where: { id, user: { id: Number(userId) } },
    });
    if (!memo) throw new NotFoundException('Memo no encontrado');
    await this.memoRepository.remove(memo);
    return { message: 'Memo eliminado correctamente' };
  }
}


