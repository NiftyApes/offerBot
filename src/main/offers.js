import { parseEther } from 'ethers/lib/utils.js';
import { sellerFinancing } from '../helpers/contracts.js';


export const createSignedOffer = async function (
  chainId,
  signer,
  creator,
  nftContractAddress,
  nftId,
  price,
  downPaymentAmount,
  numPaymentPeriods,
  periodDuration,
  periodInterestRateBps,
  expiration,
  collectionOfferLimit
) {
  const offerStruct = createOfferStruct(
    creator,
    nftContractAddress,
    nftId,
    price,
    downPaymentAmount,
    numPaymentPeriods,
    periodDuration,
    periodInterestRateBps,
    expiration,
    collectionOfferLimit
  );

  const signature = await signOfferStruct(chainId, signer, offerStruct);
  return {offer: offerStruct, signature};
};


export const createOfferStruct = function (
  creator,
  nftContractAddress,
  nftId,
  price,
  downPaymentAmount,
  numPaymentPeriods,
  periodDuration,
  periodInterestRateBps,
  expiration,
  collectionOfferLimit
) {
  // Calculate amounts in wei
  price = parseEther(String(price));
  downPaymentAmount = parseEther(String(downPaymentAmount));
  const minimumPrincipalPerPeriod = (price.sub(downPaymentAmount)).div(numPaymentPeriods);

  return {
    price,
    downPaymentAmount,
    minimumPrincipalPerPeriod,
    nftId,
    nftContractAddress,
    creator,
    periodInterestRateBps,
    periodDuration,
    expiration,
    collectionOfferLimit
  }
}

export const signOfferStruct = async function (
  chainId,
  signer,
  offerStruct
) {

  const domain = {
    name: 'NiftyApes_SellerFinancing',
    version: '0.0.1',
    chainId: chainId,
    verifyingContract: (sellerFinancing(chainId)).address
  };

  const types = {
    Offer: [
      { name: 'price', type: 'uint128' },
      { name: 'downPaymentAmount', type: 'uint128' },
      { name: 'minimumPrincipalPerPeriod', type: 'uint128' },
      { name: 'nftId', type: 'uint256' },
      { name: 'nftContractAddress', type: 'address' },
      { name: 'creator', type: 'address' },
      { name: 'periodInterestRateBps', type: 'uint32' },
      { name: 'periodDuration', type: 'uint32' },
      { name: 'expiration', type: 'uint32' },
      { name: 'collectionOfferLimit', type: 'uint64' }
    ]
  };
  const signature = await signer._signTypedData(domain, types, offerStruct);
  console.log((sellerFinancing(chainId)).address);
  return signature;
};