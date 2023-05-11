import { Controller, Get, Param, Post, StreamableFile } from '@nestjs/common';
import { CapsuleService } from './capsule.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Web3StorageFile } from '../timelock/dto';

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
  @ApiCreatedResponse()
  putFile(): Promise<string> {
    return this.appService.putFile();
  }
}
