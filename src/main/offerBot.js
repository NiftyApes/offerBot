import env from 'dotenv';
import ethers from 'ethers';
import {createHash} from "crypto";
import * as fs from "fs";
import {Wallet, providers} from "ethers";
import {createOffer} from './createOffer.js';
import fetch from 'node-fetch'
import {getRaribleCollectionStats} from './getRaribleCollectionStats.js';

globalThis.fetch = fetch
env.config();

export const offerBot = async function (input) {

    let nftContractAddress = input['nftContractAddress'];

    try {
        nftContractAddress = ethers.utils.getAddress(nftContractAddress);
    } catch (e) {
        throw {message: 'Invalid nft collection address', address: nftContractAddress};
    }

    const ltv = parseFloat(input['ltv']);

    if (ltv < 0 || ltv > 100) {
        throw {message: 'Invalid LTV provided', LTV: input['ltv']};
    }

    const chainId = input['chainId'];
    const allowedChainIds = ['0x5', '0x1', '0x64', '0x137', '0x80001'];
    if (!allowedChainIds.includes(chainId)) {
        throw {message: 'Invalid chainId', chainId: chainId};
    }

    const cacheHash = createHash('sha256').update(nftContractAddress+chainId).digest('hex');
    const cacheFileName = '/tmp/'+cacheHash+'.json';
    const existsFile = fs.existsSync(cacheFileName);

    let cData = {'startTime': 0};
    if (existsFile) {
        console.log(new Date(), "Bot RESTARTING....");
        cData = JSON.parse(fs.readFileSync(cacheFileName).toString());
    }

    const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const signer = new Wallet(process.env.PRIVATE_KEY, provider);

    if (input['dryRun']) {
        console.log('[DEBUG]', new Date(), 'Dry run, not executing offers');
        process.exit();
    }

    const expirationInMinutes = parseFloat(input['expiration']);
    let runOnce = true;
    while (input['runInLoop'] || runOnce) {
        runOnce = false;
        if (!input['runInLoop'] || (Date.now() - cData['startTime']) >= expirationInMinutes * 60 * 1000) {
            console.log(new Date(), "requesting rarible for floorPrice..");
            const collectionStats = await getRaribleCollectionStats(nftContractAddress);
            console.log(collectionStats);
            
            const offerValue = (collectionStats.floorPrice * ltv / 100).toFixed(18);
            if (offerValue <= parseFloat(input['maxOfferValue'])) {
                const offerArgs = [chainId, signer, nftContractAddress, offerValue, parseFloat(input['apr']), parseInt(input['duration']), parseInt(input['floorOfferLimit']), expirationInMinutes];
                console.log(new Date(), "starting offer creation..");
                await createOffer(...offerArgs);
                console.log(new Date(), "new offer created.", {offerValue: offerValue});
                
                if (input['runInLoop']) {
                    cData['startTime'] = Date.now();
                    fs.writeFileSync(cacheFileName, JSON.stringify(cData));
                }
            } else {
                console.log(new Date(), "Offer not created. Max loan value limit reached.", {offerValue: offerValue, maxOfferValue: parseFloat(input['maxOfferValue'])});
            }
        }
    }
};

