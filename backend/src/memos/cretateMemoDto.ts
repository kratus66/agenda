// src/memos/dto/create-memo.dto.ts
import { IsDateString, IsObject, IsArray, IsString } from 'class-validator';

export class CreateMemoDto {
  @IsDateString()
  date: string;

  @IsObject()
  schedule: Record<string, string>;

  @IsArray()
  @IsString({ each: true })
  priorities: string[];

  @IsArray()
  @IsString({ each: true })
  todos: string[];

  @IsString()
  notes: string;
}
