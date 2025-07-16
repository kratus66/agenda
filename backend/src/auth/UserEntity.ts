import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Memo } from "../memos/memoEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @OneToMany(() => Memo, memo => memo.user)
  memos: Memo[];
}

