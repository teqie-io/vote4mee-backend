import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateEmployeeDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  projects: string[];

  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsNumber()
  @IsOptional()
  contributions: number

  @IsArray()
  @IsOptional()
  skills: string[];

  @IsString()
  @IsOptional()
  overview: string;
}
