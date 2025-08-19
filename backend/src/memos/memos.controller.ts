import {
  Body,
  Post,
  Get,
  Param,
  Req,
  Controller,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MemosService } from './memos.service';
import { CreateMemoDto } from './cretateMemoDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Memo } from './memoEntity';
import { Request } from 'express';
import { UpdateMemoDto } from './updateMemoDto'; // Assuming you have an UpdateMemoDto defined for updates

@UseGuards(JwtAuthGuard)
@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Post()
  async create(@Body() createMemoDto: CreateMemoDto, @Req() req: Request) {
    const userId = req.user!.userId;
    return this.memosService.create(createMemoDto, userId);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = req.user!.userId;
    return this.memosService.findAllByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user!.userId;
    return this.memosService.findOneById(id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemoDto: UpdateMemoDto,

    @Req() req: Request,
  ) {
    const userId = req.user!.userId;
    return this.memosService.update(id, userId, updateMemoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user!.userId;
    return this.memosService.remove(id, userId);
  }
}



