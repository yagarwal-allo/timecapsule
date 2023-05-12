import process from 'process'
import minimist from 'minimist'
import { Web3Storage } from 'web3.storage'

async function main () {
  const args = minimist(process.argv.slice(2))
  const token = args.token

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  const storage = new Web3Storage({ token })
  for await (const upload of storage.list()) {
    console.log(upload);
  }
}

main()
