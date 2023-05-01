# NiftyApes SeizeAndSell Bot
The ultimate aim of this bot is to close all the expired loans on our maker contract if any.
In order to be able to execute that, it needs to process other steps before it can call seizeAndSell on maker.
Everytime it is triggerred, it executes the following steps:
1. Fetches all loans using NiftyApes endpoints and filter out expired loans.
2. Fetches top reservoir bids on all the expired loan Nfts with WETH as the currency.
3. Encode the reservoir bids as Seaport order struct and encode it as general bytes decodable by our contracts.
4. Call `seizeAndSell()` for all expired loans for which the weth bids exist on reservoir.

## Install
### NVM aka Node Version Manager
Windows: https://github.com/coreybutler/nvm-windows

Linux/MacOS: https://github.com/nvm-sh/nvm

Supported Node versions due OS are v16.13.*
### Offer Bot
After node is installed, run `npm install --global yarn`
To then install the bot, run `yarn install`
## Configuration
Copy **.env.dist** and create new `.env` fle, and missing values

### Mandatory

**PROVIDER_URL**: your rpc provider url, such as aclhemy.com, infura.io or moralis.io etc.

**PRIVATE_KEY**: Private key of wallet that should be used for creating offers.

**RESERVOIR_API_KEY**: Reservoir API Key used to create and fetch nft offers/listing.

## Run Locally
### Set contract addresses 
Set all contract addresses for your respective networks in `src/helpers/contract.js`

### Run terminal-bot.js with --help to see all the required parameter details
```console
foo@bar:~$ node src/terminal-bot.js --help
terminal-bot.js [command]

Commands:
  terminal-bot.js seize-and-sell

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --chainId       Chain Id of the network                    [string] [required]
  --runInLoop     Run bot indefinetly                 [boolean] [default: false]
  --triggerDelay  Bot trigger delay in minutes         [string] [default: false]
```

### Example Runs: 
Trigger the bot to execute `seizeAndSell` on the maker conract on goerli
```shell
 node src/terminal-bot.js --chainId 0x5
```

To run the bot indefinitely, just add `--runInLoop` to the command with `--triggerDelay`.
An example run with 5 minutes delay on goerli.
```shell
 node src/terminal-bot.js --chainId 0x5 --runInLoop --triggerDelay 5
```


## Setting up on AWS Lambda
After [installing locally](## Install):

### Create the zip

```bash
zip -r offer-bot.zip .
```

### Deploy to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use `Node.js 16.x` for the runtime and `x86_64` for architecture
  - Choose an existing role or create a new one
  - Click Create Function
![create lambda function](./img/1.png)

- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `offer-bot.zip` file
![upload zip file](./img/2.png)

- To Add the environment variable, goto `Configuration` tab, then `Environment Variable` on the left menu-
![add env var](./img/3.png)

- (repeat for all environment variables):
  - Key: PRIVATE_KEY
  - Value: Your_PRIVATE_KEY

  - Key: PROVIDER_URL
  - Value: Your_PROVIDER_URL

  - Key: RESERVOIR_API_KEY
  - Value: Your_RESERVOIR_API_KEY
- Save
![add env var](./img/5.png)

- Increase the timeout period, goto `Configuration` tab --> `General configuration` --> `Edit`
- Change timeout from 3 sec to `30 sec`. `Save`.

- To test the setup, goto `Test` tab, give any name in the event name, and paste the following for running on Goerli:
```json
{
  "chainId": "0x5"
}
```
 - click `Test`.

A successful run will have following output logs:
```bash
TO-DO
```


### To Set up automatic triggers

- Search `Cloudwatch` in the search bar and click on the top result
- Click on `Event` option on the left menu bar
- Select `Rules` from the dropdown
![create rule](./img/6.png)

- Click `Create Rule` button
- Under Event Source, choose `Schedule`
- Set timer as fixed rate of 10 minutes
- On the right, set target as your newly created lambda function. `my-seize-and-sell-bot`
- Click on `Configure Input`, select `Constant (Json Text)` and paste the params json (your offer params) in the input:
```json
{
  "chainId": "0x5"
}
```
- Now, Click on `Configure Details` button
![add env var](./img/7.png)
- Type a name (eg: seize-and-sell-goerli-10min) for the rule and click on `Create rule` button
- Go back to your newly created lambda function, goto `Monitor` tab --> `Logs` and check the logs.
![add env var](./img/8.png)
- To close the bot, just disable or delete the created rule from CloudWatch.