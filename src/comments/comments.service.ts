import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          senderId: createCommentDto.senderId,
          profileId: createCommentDto.profileId,
          content: createCommentDto.content,
        },
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async findAll(profileId: number) {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          profileId: profileId,
        },
      });
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.prisma.comment.findMany({
        where: {
          id: id,
        },
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.prisma.comment.update({
        where: {
          id: id,
        },
        data: updateCommentDto,
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.comment.delete({
        where: {
          id: id,
        },
      });
      return { msg: 'deleted comment with id: ${id}' };
    } catch (error) {
      throw error;
    }
  }
}
