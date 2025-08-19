import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Memo } from "../memos/memoEntity";
import { Alert } from "src/alerts/alert.entity";


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

  @OneToMany(() => Alert, alert => alert.user)
  alertas: Alert[];
}

