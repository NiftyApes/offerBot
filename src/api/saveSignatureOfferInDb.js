import { ethers } from 'ethers';
import { getApiUrl } from './getApiUrl.js';


export const saveSignatureOfferInDb = async function (
  chainId,
  nftContractAddress,
  nftId,
  creator,
  offer,
  offerHash,
  signature
) {
  await fetch(getApiUrl(chainId, 'signature-offers'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress: ethers.utils.getAddress(nftContractAddress),
      nftId,
      creator: ethers.utils.getAddress(creator),
      offer,
      offerHash,
      signature,
    }),
  });
}
