import { Body, Controller, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CapsuleService } from './capsule.service';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Web3StorageFile } from '../timelock/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCapsuleDto } from './dto';

@ApiTags('capsule')
@Controller()
export class CapsuleController {
  constructor(private readonly appService: CapsuleService) {}

  @Get(':id')
  @ApiOkResponse({ description: 'File' })
  getFile(@Param('id') id: string): Promise<StreamableFile | { error: string, description: string }> {
    return this.appService.getFile(id);
  }

  @Get()
  @ApiOkResponse()
  listFiles(): Promise<Web3StorageFile[]> {
    return this.appService.listFiles();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  putFile(@Body() dto: CreateCapsuleDto, @UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.appService.putFile(dto, file);
  }
}
