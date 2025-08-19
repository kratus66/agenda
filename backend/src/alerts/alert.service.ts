import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { Memo } from '../memos/memoEntity';
import { User } from '../auth/UserEntity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepo: Repository<Alert>,

    @InjectRepository(Memo)
    private memoRepo: Repository<Memo>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createAlert(dto: {
    memoId: string;
    userId: number;
    tipo: 'schedule' | 'priority' | 'todo' | 'notes';
    mensaje: string;
    horaProgramada: Date;
  }): Promise<Alert> {
    const memo = await this.memoRepo.findOne({ where: { id: dto.memoId } });
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });

    if (!memo || !user) throw new NotFoundException('Memo o usuario no encontrado');

    const alerta = this.alertRepo.create({
      tipo: dto.tipo,
      mensaje: dto.mensaje,
      horaProgramada: new Date(dto.horaProgramada),
      memo,
      user,
    });

    return this.alertRepo.save(alerta);
  }

  // más adelante agregamos un método para verificar alertas pendientes
}
