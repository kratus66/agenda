import {
  IsArray,
  IsOptional,
  IsString,
  IsDateString,
  IsObject,
  ValidateNested,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecordatorioDto {
  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsDate()
  @Type(() => Date)
  horaProgramada: Date;
}

export class UpdateMemoDto {

    @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsObject()
  schedule?: Record<string, string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  priorities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  todos?: string[];

  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  estadoPrioridades?: boolean[];

  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  estadoTareas?: boolean[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => RecordatorioDto)
  recordatorio?: RecordatorioDto;
}
