import { Injectable } from "@nestjs/common";
import { HttpChainClient, HttpCachingChain, timelockEncrypt, roundAt, timelockDecrypt } from 'tlock-js'
import {MAINNET_CHAIN_INFO, MAINNET_CHAIN_URL} from "tlock-js/drand/defaults"

@Injectable()
export class TimeLockService {
  private readonly chainClient: HttpChainClient;

  constructor() {
    const clientOpts = {
			disableBeaconVerification: false,
			noCache: false,
			chainVerificationParams: {
				chainHash: "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493",
				publicKey: "a0b862a7527fee3a731bcb59280ab6abd62d5c0b6ea03dc4ddf6612fdfc9d01f01c31542541771903475eb1ec6615f8d0df0b8b6dce385811d6dcf8cbefb8759e5e616a3dfd054c928940766d9a5b9db91e3b697e5d70a975181e007f87fca5e"
			}
    }
    this.chainClient = new HttpChainClient(new HttpCachingChain(MAINNET_CHAIN_URL, clientOpts), clientOpts, {})
  }

  async decryptTimeLockedText(value: string): Promise<Buffer> {
    return timelockDecrypt(value, this._mainnet()).then((val) => Buffer.from(val));
  }

  async timeLockBuffer(revealTime: Date, buffer: Buffer): Promise<Buffer> {
    const roundNumber = roundAt(revealTime.getTime(), MAINNET_CHAIN_INFO);
    return timelockEncrypt(roundNumber, buffer, this._mainnet()).then((val) => Buffer.from(val));
  }

 	private _mainnet(): HttpChainClient {
    return this.chainClient;
  }
}