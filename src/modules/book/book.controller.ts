import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
