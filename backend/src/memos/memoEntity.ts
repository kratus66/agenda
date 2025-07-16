import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/UserEntity';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column('jsonb', { nullable: true })
  schedule: Record<string, string>;

  @Column('text', { array: true, nullable: true })
  priorities: string[];

  @Column('text', { array: true, nullable: true })
  todos: string[];

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, user => user.memos, { onDelete: 'CASCADE' })
  user: User;
}

