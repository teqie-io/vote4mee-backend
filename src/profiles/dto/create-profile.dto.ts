import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    @IsNumber()
    @IsNotEmpty()
    employeeId: number

    @IsArray()
    @IsOptional()
    skills: string[]

    @IsString()
    @IsOptional()
    overview: string
}
