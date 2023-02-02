import {hideBin} from "yargs/helpers";
import Yargs from "yargs";
import {offerBot} from './main/offerBot.js';

const yargs = Yargs(hideBin(process.argv))
    .command('offer-bot', 'start offer bot')
    .option('nftContractAddress', {
        alias: 'addr',
        type: 'string',
        demandOption: true,
        requireArg: true,
        description: 'Address of the nft collection to create offer on'
    })
    .option('chainId', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Chain Id of the network'
    })
    .option('ltv', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Loan to Value in percentage'
    })
    .option('maxOfferValue', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Max allowed loan offer per NFT'
    })
    .option('apr', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'APR in percentage'
    })
    .option('duration', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Loan duration in number of days'
    })
    .option('floorOfferLimit', {
        type: 'string',
        demandOption: false,
        default: '1',
        description: 'Max number of Nfts for floor offer limit'
    })
    .option('expiration', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Offer expiration time in minutes'
    })
    .option('runInLoop', {
        type: 'boolean',
        requiresArg: false,
        default: false,
        description: 'Run bot indefinetly with expiration period as delay'
    })
    .option('dryRun', {
        type: 'boolean',
        requiresArg: false,
        default: false,
        description: 'Dry run'
    })
;

function exitHandler() {
    console.log(new Date(), 'Exit handler called', arguments);
    process.exit();
}

await offerBot(yargs.argv);

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

process.exit();