import process from 'process'
import minimist from 'minimist'
import { Web3Storage } from 'web3.storage'
import * as fs from 'fs';
import { timelockDecrypt } from 'tlock-js'
import { mainnet } from './util.js';

async function main () {
  const args = minimist(process.argv.slice(2))
  const token = args.token
  const cid = args.cid

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  const storage = new Web3Storage({ token })
  const res = await storage.get(cid)

  const files= await res.files()
  for (const file of files) {
    const encryptedFileText = await file.text();
    return timelockDecrypt(encryptedFileText, mainnet()).then((decryptedFileText) => {
      console.log(decryptedFileText)
      fs.writeFile('test.hmmm', decryptedFileText, () => {});
    }).catch((err) => {
      console.log('reveal Time: ', new Date(+file.name.split('-')[0]).toISOString());
      console.log(err.message)
    });
  }
}

main()
