import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      let newAuthor = await this.prisma.author.create({data: createAuthorDto})
      return newAuthor
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
      let data = await this.prisma.author.findMany()
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
      let one = await this.prisma.author.findUnique({where: {id}})
      if(!one){
        throw new NotFoundException("Author not found")
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

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      let one = await this.prisma.author.findUnique({where: {id}})
      if(!one){
        throw new NotFoundException("Author not found")
      }
      let updated = await this.prisma.author.update({where:{id},data: updateAuthorDto})
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
      let one = await this.prisma.author.findUnique({where: {id}})
      if(!one){
        throw new NotFoundException("Author not found")
      }
      let deleted = await this.prisma.author.delete({where: {id}})
      return one
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException({ message: error.message })
    }
  }
}
