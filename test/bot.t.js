import env from 'dotenv';
import { bot } from '../src/main/bot.js';
import { createSignedOffer } from '../src/main/offers.js';
import { createListing, createPurchaseOffer, getAllListing, encodeRawSeaportOrderData } from '../src/main/reservoir.js';
import { maker, seaportExecuter } from '../src/helpers/contracts.js';
import { ethers } from "ethers";

env.config();

const chainId = '0x5';
const nftContractAddress = "0xe08319d9D09d098D06194ce6420754bB80640E16";
const nftId = 11;
const nftListPrice = 0.11;
const downPaymentAmount = 0.01;
const wethToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const periodDuration = 61;

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// * Step-1:
// * We create the listing on reservoir
await createListing(chainId, nftContractAddress, nftId, nftListPrice, signer, 'reservoir');
console.log("NFT Listed for sale on reservoir.");

// * Step-2:
// * We fetch the listing data fom reservoir
const allExistingListing = await getAllListing(chainId, nftContractAddress, nftId);
if (allExistingListing.length < 1) {
    console.log("No Listing found.", allExistingListing);
    process.exit();
}
// * Step-3:
// * We encode it to pass it to Maker.buyWithFinancing()
const encodedSeaportData = encodeRawSeaportOrderData(allExistingListing[0].rawData);


// * Step-4:
// * Create and sign offer term for buyer to execute BNPL
const {offer, signature} = await createSignedOffer(
    chainId,
    signer,
    maker(chainId).address,
    nftContractAddress,
    nftId,
    nftListPrice,
    downPaymentAmount,
    10,
    periodDuration,
    0,
    (await provider.getBlock("latest")).timestamp + 60*60,
    1
);
console.log("SellerFinancing offer created by signer.");
console.log(offer, signature);

// * Step-5:
// * Send some funds to the Maker Contract to be able to provide loans
await sendFundsToUser(signer, maker(chainId).address, offer.price);

// * Step-5:
// * Buyer accepts offer on sellerFinancing using the reservoir listing
await acceptOffer(offer, signature, encodedSeaportData, signer);

// * Step-6:
// * We wait for the loan to expire
wait(offer.periodDuration); 

// * Step-7:
// * We create a purchase Offer by another party which will be used by Maker to close the loan
await createPurchaseOffer(chainId, nftContractAddress, nftId, nftListPrice, wethToken, signer);
console.log("Seaport Purchase offer");

// execute bot
await bot({'chainId': '0x5'});

function wait(waitInSec){
    var start = new Date().getTime();
    var end = start;
    console.log("Waiting for loan to expire...");
    while(end < start + waitInSec*1000) {
      end = new Date().getTime();
   }
 }

async function acceptOffer(offer, signature, encodedSeaportData, signer) {
    const makerContract = new ethers.Contract(maker(chainId).address, maker(chainId).abi, signer);
    makerContract.connect(signer);
    const tx = await makerContract.buyWithFinancing(offer, signature, signer.address, offer.nftId, seaportExecuter(chainId).address, encodedSeaportData, { value: offer.downPaymentAmount, gasLimit: 7e6 });
    await tx.wait();
    console.log(tx);
    console.log("Maker Loan successfully executed by the buyer");
}

async function sendFundsToUser(signer, userAddress, amount) {
    const tx = await signer.sendTransaction({
        to: userAddress,
        value: amount
    });
    await tx.wait();
    console.log("Funds sent to Maker contract");
}