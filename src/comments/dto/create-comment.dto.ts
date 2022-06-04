import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsNumber()
    @IsNotEmpty() 
    senderId: number
    
    @IsNumber()
    @IsNotEmpty()
    profileId: number

    @IsString()
    @IsOptional()
    content: string

}
