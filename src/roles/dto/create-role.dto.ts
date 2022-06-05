import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    weight: number
}
