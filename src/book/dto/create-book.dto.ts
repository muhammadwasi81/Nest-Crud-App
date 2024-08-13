import { Category } from '../schemas/book.schema';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
// dto = data transafer object
export class createBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly category: Category;
}
