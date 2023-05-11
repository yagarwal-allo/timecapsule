import { Injectable, StreamableFile } from '@nestjs/common';
import { roundAt, timelockDecrypt, timelockEncrypt } from 'tlock-js';
import { Web3Storage } from 'web3.storage';
import { TimeLockService } from '../timelock/timelock.service';
import { MAINNET_CHAIN_INFO } from 'tlock-js/drand/defaults';
import { Web3StorageFile } from '../timelock/dto';

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
    return timelockDecrypt(encryptedText, this.timeLockService.mainnet()).then((decryptedFileText) => {
      return new StreamableFile(Buffer.from(decryptedFileText))
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

  async putFile(): Promise<string> {
    const fileName = 'encrypted123.txt';
    const content = 'asdasbdfasa Yayyyy test test test 1213 end to end';
    const date = new Date()
    date.setMinutes(date.getMinutes() + 1);
    const roundNumber = roundAt(date.getTime(), MAINNET_CHAIN_INFO);
    const encryptedContent = await timelockEncrypt(roundNumber, Buffer.from(content), this.timeLockService.mainnet())
    const blob: any = new Blob([encryptedContent])
    blob.name = date.getTime() + '-' + fileName;
    const cid = await this.storage.put([blob]);
    return cid;
  }
}
