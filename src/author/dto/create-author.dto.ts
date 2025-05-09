import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
    @ApiProperty({ example: "J.K. Rowling" })
    name: string
}
