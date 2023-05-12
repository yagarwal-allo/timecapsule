import process from 'process'
import minimist from 'minimist'
import { Web3Storage } from 'web3.storage'
import { roundAt, timelockEncrypt } from 'tlock-js'
import {MAINNET_CHAIN_INFO} from "tlock-js/drand/defaults.js"
import { mainnet } from './util.js'


async function main () {
  const args = minimist(process.argv.slice(2))
  const token = args.token
  const fileName = 'encrypted.txt';

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  const storage = new Web3Storage({ token })
  const content = 'Yayyyy full end to end';
  const date = new Date()
  date.setMinutes(date.getMinutes() + 1);
  const roundNumber = roundAt(date.getTime(), MAINNET_CHAIN_INFO);
  const encryptedContent = await timelockEncrypt(roundNumber, Buffer.from(content), mainnet())
  const blob = new Blob([encryptedContent], { type: 'text/plain' })
  blob.name = date.getTime() + '-' + fileName;
  console.log(blob);
  const cid = await storage.put([blob]);
  console.log(cid);
  return cid;
}

main()
