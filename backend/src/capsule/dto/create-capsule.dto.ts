import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, IsDate } from "class-validator";

export class CreateCapsuleDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @Allow()
  @Type(() => File)
  file: Express.Multer.File;

  @ApiProperty({
    example: new Date()
  })
  @IsDate()
  @Type(() => Date)
  revealTime: Date;
}