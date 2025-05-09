import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({example:"Harry Potter and the Philosopher's Stone"})
    title: string
    @ApiProperty({example:1})
    authorId: number
}
