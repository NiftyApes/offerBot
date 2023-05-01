import env from 'dotenv';
import { Wallet, providers } from "ethers";
import fetch from 'node-fetch';
import { maker } from '../src/helpers/contracts.js';
import { createOfferStruct, signOfferStruct } from '../src/main/offers.js';
import { getNftAskPrice } from '../src/main/reservoir.js';

globalThis.fetch = fetch;
env.config();

export const createOffer = async function (input) {

    const nftContractAddress = input['nftContractAddress'];
    const nftId = input['nftId'];
    const chainId = input['chainId'];
    const withSignature = input['withSignature'];

    const allowedChainIds = ['0x5', '0x1'];
    if (!allowedChainIds.includes(chainId)) {
        return {statusCode: 400, message: 'Invalid chainId'};
    }

    const allowedWithSignature = [true, false];
    if (!allowedWithSignature.includes(withSignature)) {
        return {statusCode: 400, message: 'Invalid Input'};
    }

    const provider = new providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const signer = new Wallet(process.env.PRIVATE_KEY, provider);
    const blockTimestamp = Math.floor(((await provider.getBlock("latest")).timestamp) / 1000);

    const nftData = await getNftAskPrice(chainId, nftContractAddress, nftId);
    
    let response = {statusCode: 400};
    if (nftData) {
        let currentMarketPrice = nftData.price;
        let listingOrderId = nftData.listingOrderId;
        const downPaymentAmount = (process.env.DOWN_PAYMENT_PERCENTAGE/100) * currentMarketPrice;

        const offerStruct = createOfferStruct(
            maker(chainId).address,
            nftContractAddress,
            nftId,
            currentMarketPrice,
            downPaymentAmount,
            process.env.NUM_PAY_PERIODS,
            process.env.PERIOD_DURATION,
            process.env.PERIOD_INTEREST_RATE_BPS,
            blockTimestamp + process.env.OFFER_EXPIRATION_DELAY,
            1
        );

        if (!withSignature) {
            response = {
                statusCode: 200,
                offer: [offerStruct],
                listingOrderId
            };
        } else {
            response = {
                statusCode: 200,
                offer: [offerStruct],
                listingOrderId,
                signature: [await signOfferStruct(chainId, signer, offerStruct)]
            }
        }
    } else {
        response =  {
            statusCode: 200,
            offer: []
        }
    }
    return response;
};

