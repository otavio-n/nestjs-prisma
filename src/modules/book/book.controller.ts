import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO) {
    return await this.bookService.create(data);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return await this.bookService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bookService.delete(id);
  }
}
