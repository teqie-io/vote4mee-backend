import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { query } from 'express';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOneWithId(@Param('id') id: number) {
    return this.employeesService.findOneWithId(id);
  }

  @Get('/employee/wallet')
  findOneWithWallet(@Query('wallet') wallet: string) {
    console.log("query")
    return this.employeesService.findOneWithWallet(wallet);
  }

  @Get('/employee/name')
  findOneWithName(@Query('name') name: string) {
    return this.employeesService.findOneWithName(name);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':wallet')
  remove(@Param('wallet') wallet: string) {
    return this.employeesService.remove(wallet);
  }
}
