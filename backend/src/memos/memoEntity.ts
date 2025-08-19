import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/UserEntity';
import { Alert } from 'src/alerts/alert.entity';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // memoEntity.ts
  @Column()
  title: string;


  @Column()
  date: string;

  @Column('jsonb', { nullable: true })
  schedule: Record<string, string>;

  @Column('text', { array: true, nullable: true })
  priorities: string[];

  @Column('text', { array: true, nullable: true })
  todos: string[];

  @Column('text', { array: true, nullable: true })
  notes: string[];

  @Column('jsonb', { nullable: true })
  estadoPrioridades: boolean[];

  @Column('jsonb', { nullable: true })
  estadoTareas: boolean[];

  @Column('jsonb', { nullable: true })
  recordatorio?: {
    mensaje: string;
    horaProgramada: Date;
  };

  @ManyToOne(() => User, user => user.memos, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Alert, alert => alert.memo)
  alertas: Alert[];
}
