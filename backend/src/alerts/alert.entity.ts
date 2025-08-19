// alert.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import{ Memo } from "../memos/memoEntity"
import { User } from '../auth/UserEntity';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
  type: 'enum',
  enum: ['schedule', 'priority', 'todo', 'notes'],
  })
  tipo: 'schedule' | 'priority' | 'todo' | 'notes';


  @Column()
  mensaje: string;

  @Column()
  horaProgramada: Date;

  @Column({ default: false })
  enviado: boolean;

  @ManyToOne(() => Memo, memo => memo.alertas, { onDelete: 'CASCADE' })
  memo: Memo;

  @ManyToOne(() => User, user => user.alertas, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
