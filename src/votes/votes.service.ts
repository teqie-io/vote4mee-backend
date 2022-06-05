import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  create(createVoteDto: CreateVoteDto) {
    try {
      const vote = this.prisma.vote.create({
        data: {
          senderId: Number(createVoteDto.senderId),
          receiverId: Number(createVoteDto.receiverId),
          amount: Number(createVoteDto.amount),
        },
      });
      return vote;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      const votes = this.prisma.vote.findMany();
      return votes;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      const vote = this.prisma.vote.findUnique({
        where: {
          id: Number(id),
        },
      });
      return vote;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    const senderId = Number(updateVoteDto.senderId);
    const receiverId = Number(updateVoteDto.receiverId);
    const amount = Number(updateVoteDto.amount);
    try {
      const vote = this.prisma.vote.update({
        where: {
          id: Number(id),
        },
        data: {
          senderId,
          receiverId,
          amount,
        },
      });
      return vote;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      const vote = this.prisma.vote.delete({
        where: {
          id: Number(id),
        },
      });
      return vote;
    } catch (error) {
      throw error;
    }
  }
}
