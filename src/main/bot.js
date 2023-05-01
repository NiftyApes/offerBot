import env from 'dotenv';
import ethers from 'ethers';
import {createHash} from "crypto";
import * as fs from "fs";
import {Wallet, providers} from "ethers";
import fetch from 'node-fetch';
import { getActiveSellerLoans } from './getActiveSellerLoans.js';
import { getTopWethOffer, encodeRawSeaportOrderData } from './reservoir.js';
import { seizeAndSell } from './seizeAndSell.js';
import { maker } from '../helpers/contracts.js';

globalThis.fetch = fetch
env.config();

export const printLog = function (messageString) {
    console.log(new Date(), messageString);
}

export const bot = async function (input) {

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

    const cacheHash = createHash('sha256').update(maker(chainId).address+chainId).digest('hex');
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

    let runOnce = true;
    while (input['runInLoop'] || runOnce) {
        runOnce = false;
        if (!input['runInLoop'] || (Date.now() - cache['startTime']) >= triggerDelayInMins * 60 * 1000) {

            // fetch all the maker loans which are active
            const allMakerLoans = await getActiveSellerLoans(maker(chainId).address, chainId);
            printLog(allMakerLoans);
            
            // create a list of top offers (if exists) for all nfts in expired loans
            printLog("All loans:")
            let validTopBids = [];
            for (let i = 0; i < allMakerLoans.length; i++) {
                const loan = allMakerLoans[i];
                if (loan.loan.periodEndTimestamp <= blockTimestamp) {
                    printLog("Expired: " + loan.offer.offer.nftContractAddress +":" +String(loan.offer.offer.nftId));

                    const topBid = await getTopWethOffer(chainId, loan.offer.offer.nftContractAddress, loan.offer.offer.nftId);
                    if(topBid) {
                        validTopBids.push({
                            nftContractAddress: loan.offer.offer.nftContractAddress,
                            nftId: loan.offer.offer.nftId,
                            encodedTopBid: encodeRawSeaportOrderData(topBid.rawData)
                        });
                    }    
                } else {
                    printLog("Active: ", loan.offer.offer.nftContractAddress, loan.offer.offer.nftId);
                }
            }   

            // execute seize and sell for the nfts for which the offer exists
            for (let i = 0; i < validTopBids.length; i++) {
                printLog("Calling seizeAndSell for:");
                printLog(validTopBids[i]);
                await seizeAndSell(chainId, validTopBids[i].nftContractAddress, validTopBids[i].nftId, validTopBids[i].encodedTopBid, signer);
            }

            if (input['runInLoop']) {
                cache['startTime'] = Date.now();
                fs.writeFileSync(cacheFileName, JSON.stringify(cache));
            }
        }
    }
};

