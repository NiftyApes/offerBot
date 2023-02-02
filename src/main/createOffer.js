import { ethers } from 'ethers';
import { saveSignatureOfferInDb } from '../api/saveSignatureOfferInDb.js';


const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const createOffer = async function (chainId, signer, nftContractAddress, amount, aprInPercent, durationInDays, offerLimit, expirationInHours) {
  const address = signer.address;

  const offersContractAddress = ethers.utils.getAddress('0x896A60e3f3457a3587F2ce30D812ffeDb7547EC7');

  const SECONDS_IN_YEAR = 3.154e7

  if (!address) {
    throw new Error('Address is not defined');
  }

  if (!chainId) {
    throw Error('No chain id');
  }

  const offerAttempt = {
    creator: address,
    duration: Math.floor(durationInDays * 86400),
    expiration: Math.floor(
      Date.now() / 1000 + expirationInHours * 60,
    ),
    fixedTerms: false,
    floorTerm: true,
    lenderOffer: true,
    nftContractAddress: nftContractAddress,
    nftId: 0,
    asset: ETH_ADDRESS,
    amount: ethers.utils.parseUnits(String(amount), 'ether'),
    interestRatePerSecond: Math.round(
      ((aprInPercent / 100) * (amount * 1e18)) / SECONDS_IN_YEAR,
    ),
    floorTermLimit: offerLimit,
  };

  const domain = {
    name: 'NiftyApes_Offers',
    version: '0.0.1',
    chainId,
    verifyingContract: offersContractAddress,
  };

  const types = {
    Offer: [
      { name: 'creator', type: 'address' },
      { name: 'duration', type: 'uint32' },
      { name: 'expiration', type: 'uint32' },
      { name: 'fixedTerms', type: 'bool' },
      { name: 'floorTerm', type: 'bool' },
      { name: 'lenderOffer', type: 'bool' },
      { name: 'nftContractAddress', type: 'address' },
      { name: 'nftId', type: 'uint256' },
      { name: 'asset', type: 'address' },
      { name: 'amount', type: 'uint128' },
      { name: 'interestRatePerSecond', type: 'uint96' },
      { name: 'floorTermLimit', type: 'uint64' },
    ],
  };

  const values = offerAttempt;

  let result = await signer._signTypedData(domain, types, values);

  // Ledger was ending signatures with '00' or '01' for some reason
  // So below we're replacing those with '1b' and '1c' respectively
  // In order to avoid ECDSA error

  if (result.slice(-2) === '00') {
    result = result.slice(0, -2) + '1b';
  }

  if (result.slice(-2) === '01') {
    result = result.slice(0, -2) + '1c';
  }
  // console.log("here ----", offerAttempt.nftContractAddress);
  await saveSignatureOfferInDb(
    chainId,
    offerAttempt.nftContractAddress,
    offerAttempt.nftId,
    offerAttempt.creator,
    {
      ...offerAttempt,
      amount: offerAttempt.amount.toString(),
    },
    ethers.utils._TypedDataEncoder.hashStruct(
      'Offer',
      types,
      values,
    ),
    result,
  );
};
