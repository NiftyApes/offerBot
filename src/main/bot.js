import env from 'dotenv';
import ethers from 'ethers';
import {createHash} from "crypto";
import * as fs from "fs";
import {Wallet, providers} from "ethers";
import fetch from 'node-fetch'
import { getActiveSellerLoans } from './getActiveSellerLoans.js';
import { getTopWethOffer, encodeRawSeaportOrderData } from './seaport.js';
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

    let runOnce = true;
    while (input['runInLoop'] || runOnce) {
        runOnce = false;
        if (!input['runInLoop'] || (Date.now() - cache['startTime']) >= triggerDelayInMins * 60 * 1000) {

            // fetch all the maker loans which are active
            const allMakerLoans = await getActiveSellerLoans(makerAddress, chainId);
            printLog(allMakerLoans);
            
            // create a list of top offers (if exists) for all nfts in expired loans
            printLog("All loans:")
            let validTopBids = [];
            for (let i = 0; i < allMakerLoans.length; i++) {
                const loan = allMakerLoans[i];
                if (loan.loan.periodEndTimestamp <= blockTimestamp) {
                    printLog("Expired: ", "0xe08319d9D09d098D06194ce6420754bB80640E16", 11);

                    const topBid = await getTopWethOffer(chainId, "0xe08319d9D09d098D06194ce6420754bB80640E16", 11);
                    if(topBid) {
                        validTopBids.push({
                            nftContractAddress: "0xe08319d9D09d098D06194ce6420754bB80640E16",
                            nftId: 11,
                            encodedTopBid: encodeRawSeaportOrderData(topBid.rawData)
                        });
                    }    
                } else {
                    printLog("Active: ", "0xe08319d9D09d098D06194ce6420754bB80640E16", 11);
                }
            }   

            // execute seize and sell for the nfts for which the offer exists
            printLog("Valid top bids:");
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

