import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.prisma.role.create({
        data: {
          id: createRoleDto.id,
          name: createRoleDto.name,
          weight: Number(createRoleDto.weight),
        },
      });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const roles = await this.prisma.role.findMany();
      return roles
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.prisma.role.findFirst({
        where: {
          id: id
        }
      })
      return role;
    } catch (error){
      throw error
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.role.delete({
        where: {
          id: id
        }
      })
      return {msg: "deleted role with id: ${id}"}
    } catch (error) {
      throw error;
    }
  }
}
