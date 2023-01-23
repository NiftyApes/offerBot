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
### Run without execution: Create floor Offer for the given contract on GOERLI with LTV of 0.001 ETH, which expire in 1 hour, APR 5%, valid for 2 days.
```shell
 node src/index.js --nftContractAddress 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d --apr 5 --duration 2 --offerLimit 3 --expiration 1 --ltv 0.001 --maxOfferValue 0.1 --chainId 0x5 --dryRun
```
### Create floor Offer for the given contract on GOERLI with LTV of 0.001 ETH, which expire in 1 hour, APR 5%, valid for 2 days.
```shell
 node src/index.js --nftContractAddress 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d --apr 5 --duration 2 --offerLimit 3 --expiration 1 --ltv 0.001 --maxOfferValue 0.1 --chainId 0x5
```
### Bid 0.1 WETH on all assets of given contract, which expire in 15min
```shell
 node src/index.js --contract "0x9ca8887d13bc4591ae36972702fdf9de2c97957f" --bid "0.1"
```
### Bid 0.1 WETH on all assets of given contract, which expire in 30min
```shell
 node src/index.js --contract "0x9ca8887d13bc4591ae36972702fdf9de2c97957f" --bid "0.1" --offer-expiration "30"
```
### Prefetch metadata for given contract
```shell
 node src/index.js --contract "0x9ca8887d13bc4591ae36972702fdf9de2c97957f" --prefetch
```
### Filter before bidding
```shell
 node src/index.js --contract "0x9ca8887d13bc4591ae36972702fdf9de2c97957f" --bid "0.1" --trait "Issue Number" --trait-value "Issue 1"
```
## Upcoming features
- Percentage bid based on floor price
- Bidding with other ERC-20 tokens
- Leveraging Looksrare collection/trait based orders
## Support
For any questions feel free to contact me on [twitter](https://twitter.com/bavragor94)
## Donations
For supporting my projects and keep them running, feel free to tip **tony-stark.eth**