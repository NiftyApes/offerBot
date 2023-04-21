import env from 'dotenv';
import { bot } from '../src/main/bot.js';
import { createSignedOffer } from '../src/main/createOffer.js';
import { createListing } from '../src/main/reservoir.js';
import { maker, seaportExecuter } from '../src/helpers/contracts.js';
import { ethers } from "ethers";

env.config();

const chainId = "0x5";
const nftContractAddress = "0xe08319d9D09d098D06194ce6420754bB80640E16";
const nftId = 10;
const nftListPrice = 0.011;
const downPaymentAmount = 0.001;
console.log(process.env.PROVIDER_URL);

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const encodedSeaportData = await createListing(nftContractAddress, nftId, nftListPrice, signer);
// console.log(encodedSeaportData);

const {offer, signature} = await createSignedOffer(
    chainId,
    signer,
    maker(chainId).address,
    nftContractAddress,
    nftId,
    nftListPrice,
    downPaymentAmount,
    10,
    61,
    0,
    60*60,
    1
);
console.log(offer, signature);

await sendFundsToUser(signer, maker(chainId).address, offer.price);

// // createReservoirSaleOffer

await acceptOffer(offer, signature, encodedSeaportData, signer);

// createReservoirPurchaseOffer


// // wait for loan to expire
// wait(signedOffer.periodDuration); 



// await bot({'makerAddress': maker.address, 'chainId': '0x5'});

// function wait(waitInSec){
//     var start = new Date().getTime();
//     var end = start;
//     while(end < start + waitInSec*1000) {
//       end = new Date().getTime();
//    }
//  }

async function acceptOffer(offer, signature, encodedSeaportData, signer) {
    const makerContract = new ethers.Contract(maker(chainId).address, maker(chainId).abi, signer);
    makerContract.connect(signer);
    const tx = await makerContract.buyWithFinancing(offer, signature, signer.address, offer.nftId, seaportExecuter(chainId).address, encodedSeaportData, { value: offer.downPaymentAmount, gasLimit: 7e6 });
    await tx.wait();
    console.log(tx);
}

async function sendFundsToUser(signer, userAddress, amount) {
    const tx = await signer.sendTransaction({
        to: userAddress,
        value: amount
    });
    await tx.wait();
}