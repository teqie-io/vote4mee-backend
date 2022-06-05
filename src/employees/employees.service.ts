import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const name = createEmployeeDto.name;
      const roleId = createEmployeeDto.roleId;
      const walletId = createEmployeeDto.walletId;
      const role = await this.prisma.role.findUnique({
        where: {
          id: roleId,
        },
      });
      if (!role) {
        throw new ForbiddenException('Role not found');
      }
      // check if contributions exist in createEmployeeDto  
      let contributions = createEmployeeDto.contributions;
      if (contributions) {
        contributions = Number(contributions)
      }
      const skills = createEmployeeDto.skills;
      const overview = createEmployeeDto.overview;

      const employee = await this.prisma.employee.create({
        data: {
          name: name,
          walletId: walletId,
          roleId: roleId,
          contributions: contributions,
        },
      });
      const profile = await this.prisma.profile.create({
        data: {
          employeeId: employee.id,
          skills: skills,
          overview: overview,
        },
      });
      return {
        employee: employee,
        profile: profile
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const employees = await this.prisma.employee.findMany();
      return employees;
    } catch (error) {
      throw error;
    }
  }

  async findOneWithWallet(wallet: string) {
    try {
      const employee = await this.prisma.employee.findFirst({
        where: {
          walletId: wallet,
        },
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async findOneWithName(name: string) {
    try {
      const employee = await this.prisma.employee.findFirst({
        where: {
          name: name,
        },
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      let contributions = updateEmployeeDto.contributions;
      if (contributions) {
        contributions = Number(contributions)
      }
      const employee = this.prisma.employee.update({
        where: {
          id: Number(id),
        },
        data: updateEmployeeDto,
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async remove(wallet: string) {
    try {
      const deleteEmployee = await this.prisma.employee.delete({
        where: {
          walletId: wallet,
        },
      });
      return { msg: 'deleted employee with wallet: ${wallet}' };
    } catch (error) {
      throw error;
    }
  }
}
