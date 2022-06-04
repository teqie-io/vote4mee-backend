import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    @IsNumber()
    @IsNotEmpty()
    employeeId: number

    @IsArray()
    @IsOptional()
    skill: string[]

    @IsString()
    @IsOptional()
    overview: string
}
