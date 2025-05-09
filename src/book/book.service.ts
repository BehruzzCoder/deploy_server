import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createBookDto: CreateBookDto) {
    try {
      let newBook = await this.prisma.book.create({ data: createBookDto })
      return newBook
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.book.findMany({ include: { author: true } })
      return data
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.book.findUnique({ where: { id }, include: { author: true } })
      if (!one) {
        throw new NotFoundException("Book not found")
      }
      return one
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      let one = await this.prisma.book.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Book not found")
      }
      let updated = await this.prisma.book.update({ where: { id }, data: updateBookDto })
      return updated
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async remove(id: number) {
    try {
      let one = await this.prisma.book.findUnique({ where: { id } })
      if (!one) {
        throw new NotFoundException("Book not found")
      }
      let deleted = await this.prisma.book.delete({ where: { id } })
      return deleted
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }
}
