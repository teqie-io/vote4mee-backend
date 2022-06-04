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
      const employee = await this.prisma.employee.create({
        data: {
          name: createEmployeeDto.name,
          walletId: createEmployeeDto.walletId,
          roleId: createEmployeeDto.roleId,
          contributions: createEmployeeDto.contributions,
        },
      });
      return employee;
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

  async update(wallet: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = this.prisma.employee.update({
        where: {
          walletId: wallet,
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
