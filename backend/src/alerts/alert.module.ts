import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { Memo } from '../memos/memoEntity';
import { User } from '../auth/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Memo, User])],
  providers: [AlertService],
  controllers: [AlertController],
  exports: [AlertService],
})
export class AlertModule {}
