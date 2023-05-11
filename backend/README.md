# A Full Responsibile Vulnerability Discloser
*Currently its WIP*

## Technologies used:
- **Web3Storage** - Mainnet chain (as decentralized storage for your vulnerability reports)
- **Timelock-js** - Timelock to timelock your files for certain time in future (right now the time is fixed to 1 minute)

## Usage:

- Copy .env.example to .env and then set env variables.
```bash
cp .env.example .env
```
- Create an account and api token on web3storage and set api token in .env file
- Install all the dependencies using: `yarn install`
- Start the server using: `yarn start:dev`
- Server starts on your port: `http://localhost:3000`
- To access swagger documentation go to: `http://localhost:3000/docs`
