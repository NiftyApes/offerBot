import { maker, seaportExecuter } from '../helpers/contracts.js';
import { ethers } from "ethers";

export const seizeAndSell = async function (chainId, nftContractAddress, nftId, encodedBidData, signer) {
    const makerContract = new ethers.Contract(maker(chainId).address, maker(chainId).abi, signer);
    makerContract.connect(signer);
    const tx = await makerContract.seizeAndSellNft(nftContractAddress, nftId, seaportExecuter(chainId).address, 0, encodedBidData, {gasLimit: 7e6 });
    await tx.wait();
    console.log(tx);
}