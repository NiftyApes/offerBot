import { getLoans } from '../helpers/getLoans.js';

export const getActiveSellerLoans = async function (
  sellerAddress,
  chainId
) {
  const allLoans =  await getLoans(chainId, sellerAddress);
  return allLoans;
}
