# Ride Share Demo

A demo dapp with react, express, ipfs, postgres and testrpc.

An Insomnia workspace is included to make testing the api easy.

Not complete just yet... need to add final wires...

## Getting Started With Docker

* [Install Docker](https://docs.docker.com/engine/installation/)
* [Install Insomnia](https://insomnia.rest/)

```
docker-compose up --build
```

## Without Docker

* [Install IPFS](https://ipfs.io/docs/install/)
* [Install NodeJS](https://nodejs.org/en/download/)
* [Install Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Install Insomnia](https://insomnia.rest/)

### Install Global Node Dependencies

```
yarn global add truffle@beta ethereumjs-testrpc
```

### Start Dependencies in Terminal

```
ipfs daemon
```

```
testrpc
```

### Generate and Start Demo

```
cd ./dapp
yarn install
yarn reset
yarn start
```

IPFS is sometimes not fast enough with updates... if you see this:

```
/node_modules/transmute-framework/lib/TransmuteIpfs/TransmuteIpfs.js:165
stream.on("data", function (chunk) {
```

restart the demo... we will add retries to resolve this in the future... sorry :(

### Built With

* Transmute Framework
* Solidity Smart Contracts
* Truffle
* Insomnia
* Docker
* Postgres
* Express
* IPFS
* TestRPC

### Future Work

* https://www.npmjs.com/package/swagger-express
