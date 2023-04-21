import env from 'dotenv';
import ethers from 'ethers';
import {createHash} from "crypto";
import * as fs from "fs";
import {Wallet, providers} from "ethers";
import fetch from 'node-fetch'
import { getActiveSellerLoans } from './getActiveSellerLoans.js';
import {getTopWethOffer} from './reservoir.js';
import { seizeAndSell } from './seizeAndSell.js';

globalThis.fetch = fetch
env.config();

export const printLog = function (messageString) {
    console.log(new Date(), messageString);
}

export const bot = async function (input) {

    let makerAddress = input['makerAddress'];

    try {
        makerAddress = ethers.utils.getAddress(makerAddress);
    } catch (e) {
        throw {message: 'Invalid maker address', address: makerAddress};
    }

    const chainId = input['chainId'];
    const allowedChainIds = ['0x5', '0x1', '0x64', '0x137', '0x80001'];
    if (!allowedChainIds.includes(chainId)) {
        throw {message: 'Invalid chainId', chainId: chainId};
    }

    let triggerDelayInMins = 0;
    if (input['runInLoop']) {
        if(input['triggerDelay'] == false){
            throw {message: 'Invalid triggerDelay provided', triggerDelay: input['triggerDelay']};
        }
        triggerDelayInMins = parseFloat(input['triggerDelay']);
    }

    const cacheHash = createHash('sha256').update(makerAddress+chainId).digest('hex');
    const cacheFileName = '/tmp/'+cacheHash+'.json';
    const existsFile = fs.existsSync(cacheFileName);

    let cache = {'startTime': 0};
    if (existsFile) {
        printLog("Bot RESTARTING....");
        cache = JSON.parse(fs.readFileSync(cacheFileName).toString());
    }

    const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const signer = new Wallet(process.env.PRIVATE_KEY, provider);
    const blockTimestamp = (await provider.getBlock("latest")).timestamp;
    console.log(blockTimestamp);
    let runOnce = true;
    while (input['runInLoop'] || runOnce) {
        runOnce = false;
        if (!input['runInLoop'] || (Date.now() - cache['startTime']) >= triggerDelayInMins * 60 * 1000) {

            // fetch all the maker loans which are active
            const allMakerLoans = await getActiveSellerLoans(makerAddress, chainId);

            // create a list of top offers (if exists) for all nfts in expired loans

            console.log("All loans:")
            let validTopBids = [];
            for (let i = 0; i < allMakerLoans.length; i++) {
                const loan = allMakerLoans[i];
                if (loan.loan.periodEndTimestamp <= blockTimestamp) {
                    console.log("Expired: ", loan.offer.offer.nftContractAddress, loan.offer.offer.nftId);

                    const topBid = await getTopWethOffer(loan.offer.offer.nftContractAddress, loan.offer.offer.nftId);
                    if(topBid) {
                        validTopBids.push({
                            nftContractAddress: loan.offer.offer.nftContractAddress,
                            nftId: loan.offer.offer.nftId,
                            topBid: topBid
                        });
                    }    
                } else {
                    console.log("Active: ", loan.offer.offer.nftContractAddress, loan.offer.offer.nftId);
                }
            }   

            // execute seize and sell for the nfts for which the offer exists
            console.log("Valid top bids:");
            for (let i = 0; i < validTopBids.length; i++) {
                console.log(validTopBids[i]);
                await seizeAndSell(chainId, validTopBids[i].nftContractAddress, validTopBids[i].nftId, validTopBids[i].topBid);
            }

            if (input['runInLoop']) {
                cache['startTime'] = Date.now();
                fs.writeFileSync(cacheFileName, JSON.stringify(cache));
            }
        }
    }
};

