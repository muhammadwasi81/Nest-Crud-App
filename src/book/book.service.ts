import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { ApiResponse, createResponse } from 'src/utils/api-response.util';
import { createBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
  ) {}

  async findAll(): Promise<ApiResponse<Book[]>> {
    const books = await this.bookModel.find({});
    console.log(books, 'Books');
    return createResponse(200, 'Books fetched successfully', books);
  }

  async create(book: createBookDto): Promise<ApiResponse<Book>> {
    const res = await this.bookModel.create(book);
    console.log(res, 'createbook');
    return createResponse(201, 'Book created successfully', res);
  }

  async findByID(id: string): Promise<ApiResponse<Book>> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    console.log(book, 'findByID');
    return createResponse(200, 'Book found', book);
  }

  async deleteBookByID(id: string): Promise<ApiResponse<Book>> {
    const book = await this.bookModel.findByIdAndDelete(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    console.log(book, 'deleteBookByID');
    return createResponse(200, 'Book deleted successfully', book);
  }

  async updatedBookByID(id: string, book: createBookDto): Promise<ApiResponse<Book>> {
    const getBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true, runValidators: true });
    if (!getBook) {
      throw new NotFoundException('Book not found');
    }
    console.log(getBook, 'updatedBookByID');
    return createResponse(200, 'Book updated successfully', getBook);
  }
}
