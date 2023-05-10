# A Full Responsibile Vulnerability Discloser
*Currently its WIP*

## Technologies used:
- **Web3Storage** - Mainnet chain (as decentralized storage for your vulnerability reports)
- **Timelock-js** - Timelock to timelock your files for certain time in future (right now the time is fixed to 1 minute)

## Plans:

1. Replace the scripts with an api server.
2. Currently the text which is being uploaded and name of files are hardcoded. Take them for user actions.
3. Create a webfrontend to ease the usage.

## Usage:

- Create an account and api token on web3.storage.
- To insert a file in timelock encrypted file in web3storage use the command - 
```bash
node list-files.js --token=<YOUR_API_TOKEN>
```
- To get a decrypted timelocked file from web3storage - 
```bash
node get-file.js --token=<YOUR_API_TOKEN> --cid=<CID_OF_THE_POST>
```
- To list all the uploaded files from web3storage - 
```bash
node put-files.js --token=<YOUR_API_TOKEN>
```


