import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { profile } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async create(createProfileDto: CreateProfileDto) {
    try {
      const employeeId = createProfileDto.employeeId;
      let skills = createProfileDto.skills;
      let overview = createProfileDto.overview;
      if (!employeeId) {
        throw new ForbiddenException('EmployeeId not found');
      }

      const profile = await this.prisma.profile.create({
        data: {
          employeeId: employeeId,
          skills: skills,
          overview: overview,
        },
      });
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const profiles = await this.prisma.profile.findMany();
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const profile = await this.prisma.profile.findFirst({
        where: {
          id: id,
        },
      });
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const profile = this.prisma.profile.update({
        where: {
          id: id,
        },
        data: updateProfileDto,
      });
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.profile.delete({
        where: {
          id: id,
        },
      });
      return { msg: 'deleted profile with id: ${id}' };
    } catch (error) {
      throw error;
    }
  }
}
