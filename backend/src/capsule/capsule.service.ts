import { Injectable, StreamableFile } from '@nestjs/common';
import { File, Web3Storage } from 'web3.storage';

import { TimeLockService, Web3StorageFile } from '../timelock';
import { CreateCapsuleDto } from './dto';

@Injectable()
export class CapsuleService {
  private readonly storage: Web3Storage;

  constructor(private readonly timeLockService: TimeLockService) {
    this.storage = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
  }

  async getFile(id: string): Promise<any> {
    const res = await this.storage.get(id);
    const files = await res.files()
    if (!files.length) {
      return undefined;
    }
    const file = files[0];
    const encryptedText = await file.text();
    return this.timeLockService.decryptTimeLockedText(encryptedText).then((decryptedBuffer) => {
      return new StreamableFile(decryptedBuffer)
    }).catch((err) => {
      return {error: err.message, description: `Reveal Time: ${new Date(+file.name.split('-')[0]).toISOString()}`};
    });
  }

  async listFiles(): Promise<Web3StorageFile[]> {
    const files: Web3StorageFile[] = [];
    for await (const upload of this.storage.list()) {
      files.push(upload as Web3StorageFile);
    }
    return files;
  }

  async putFile(dto: CreateCapsuleDto, file: Express.Multer.File): Promise<string> {
    const fileName = dto.revealTime.getTime() + '-' + file.originalname;
    const web3File = new File([await this.timeLockService.timeLockBuffer(dto.revealTime, file.buffer)], fileName, { type: file.mimetype });
    return this.storage.put([web3File]);
  }
}
