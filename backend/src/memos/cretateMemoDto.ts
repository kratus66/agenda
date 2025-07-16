import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemoDto {
  @IsDateString()
  date: string;

  @IsObject()
  @IsOptional()
  schedule: Record<string, string>;

  @IsArray()
  @IsOptional()
  priorities: string[];

  @IsArray()
  @IsOptional()
  todos: string[];

  @IsString()
  @IsOptional()
  notes: string;
}
