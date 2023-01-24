# NiftyApes Offer Bot

## Install
### NVM aka Node Version Manager
Windows: https://github.com/coreybutler/nvm-windows

Linux/MacOS: https://github.com/nvm-sh/nvm

Supported Node versions due OS are v16.13.*
### Bidding Bot
After node is installed, run `npm install --global yarn`
To then install the bot, run `yarn install`
## Configuration
Copy **.env.dist** and add missing values

### Mandatory

**PROVIDER**: your rpc provider url, such as moralis.io, infura.io etc.

**PRIVATE_KEY**: Private key of wallet that should be used for creating offers

## Examples ERC721
### Run without execution: Create floor Offer for the given contract on GOERLI with LTV of 0.1%, APR 5%, valid for 2 days, and re-reates offer with delay of 1 minute.
```shell
 node src/index.js --nftContractAddress 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d --apr 5 --duration 2 --offerLimit 3  --ltv 0.1 --maxOfferValue 0.1 --chainId 0x5 --updateDelay 1 --dryRun
```
### Create floor Offer for the given contract on GOERLI with LTV of 0.1%, APR 5%, valid for 2 days, and re-reates offer with delay of 1 minute.
```shell
 node src/index.js --nftContractAddress 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d --apr 5 --duration 2 --offerLimit 3  --ltv 0.1 --maxOfferValue 0.1 --chainId 0x5 --updateDelay 1
```