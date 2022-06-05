import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVoteDto {
    @IsNumber()
    @IsNotEmpty()
    senderId: number;

    @IsNumber()
    @IsNotEmpty()
    receiverId: number;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
