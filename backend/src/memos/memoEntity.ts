// src/memos/entities/memo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column('jsonb')
  schedule: Record<string, string>;

  @Column('text', { array: true })
  priorities: string[];

  @Column('text', { array: true })
  todos: string[];

  @Column('text')
  notes: string;
}
