import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { ApiResponse } from 'src/utils/api-response.util';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<ApiResponse<Book[]>> {
    return this.bookService.findAll();
  }

  @Post('new')
  @UsePipes(new ValidationPipe())
  async createBook(
    @Body()
    book: createBookDto
  ): Promise<ApiResponse<Book>> {
    return this.bookService.create(book);
  }

  @Get(':id')
  async getBookByID(
    @Param('id')
    id: string
  ): Promise<ApiResponse<Book>> {
    return this.bookService.findByID(id);
  }

  @Delete(':id')
  async deleteBookByID(
    @Param('id')
    id: string
  ): Promise<ApiResponse<Book>> {
    return this.bookService.deleteBookByID(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateBookByID(
    @Param('id')
    id: string,
    @Body()
    book: createBookDto
  ): Promise<ApiResponse<Book>> {
    return this.bookService.updatedBookByID(id, book);
  }
}
