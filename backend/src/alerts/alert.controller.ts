import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async create(@Body() dto: {
    memoId: string;
    userId: number;
    tipo: 'schedule' | 'priority' | 'todo' | 'notes';
    mensaje: string;
    horaProgramada: Date;
  }) {
    return this.alertService.createAlert(dto);
  }
}
