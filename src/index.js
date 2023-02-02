import env from 'dotenv';
import ethers from 'ethers';
import {hideBin} from "yargs/helpers";
import Yargs from "yargs";
import {createHash} from "crypto";
import * as fs from "fs";
import {Wallet, providers} from "ethers";
import {createOffer} from './main/createOffer.js';
import fetch from 'node-fetch'
import {getRaribleCollectionStats} from './main/getRaribleCollectionStats.js';

globalThis.fetch = fetch
env.config();

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
        description: 'Duration in number of days'
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
        description: 'Continuously creates offer at end of expiry'
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

let nftContractAddress = yargs.argv.nftContractAddress;

try {
    nftContractAddress = ethers.utils.getAddress(nftContractAddress);
} catch (e) {
    throw {message: 'Invalid nft collection address', address: nftContractAddress};
}

const ltv = parseFloat(yargs.argv.ltv);

if (ltv < 0 || ltv > 100) {
    throw {message: 'Invalid LTV provided', LTV: yargs.argv.ltv};
}

const chainId = yargs.argv.chainId;
const allowedChainIds = ['0x5', '0x1', '0x64'];
if (!allowedChainIds.includes(chainId)) {
    throw {message: 'Invalid chainId', chainId: chainId};
}

const cacheHash = createHash('sha256').update(nftContractAddress+chainId).digest('hex');
const cacheFileName = 'cache/'+cacheHash+'.json';
const existsFile = fs.existsSync(cacheFileName);

let cData = {'startTime': 0};
if (existsFile) {
    console.log("Bot RESTARTING....");
    cData = JSON.parse(fs.readFileSync(cacheFileName).toString());
}

const provider = new providers.JsonRpcProvider(process.env.PROVIDER);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);

if (yargs.argv.dryRun) {
    console.log('[DEBUG]', new Date(), 'Dry run, not executing offers');
    process.exit();
}

const expirationInMinutes = parseFloat(yargs.argv.expiration);
let runOnce = true;
while (yargs.argv.runInLoop || runOnce) {
    runOnce = false;
    if ((Date.now() - cData['startTime']) >= expirationInMinutes * 60 * 1000) {
        const collectionStats = await getRaribleCollectionStats(nftContractAddress);

        const offerValue = (collectionStats.floorPrice * ltv / 100).toFixed(18);
        console.log(offerValue, collectionStats);
        if (offerValue <= parseFloat(yargs.argv.maxOfferValue)) {
            const offerArgs = [chainId, signer, nftContractAddress, offerValue, parseFloat(yargs.argv.apr), parseInt(yargs.argv.duration), parseInt(yargs.argv.floorOfferLimit), expirationInMinutes];
            await createOffer(...offerArgs);
            console.log(new Date(), "New Offer Created.", {offerValue: offerValue});
        } else {
            console.log(new Date(), "Offer not created. Max loan value limit reached.", {offerValue: offerValue, maxOfferValue: parseFloat(yargs.argv.maxOfferValue)});
        }
        cData['startTime'] = Date.now();
        fs.writeFileSync(cacheFileName, JSON.stringify(cData));
    }
}


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