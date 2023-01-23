/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */

export const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const getRaribleCollectionStats = async function (contractAddress) {
  

  if (!contractAddress) {
    throw new Error('Contract address is required');
  }
  const response = await fetch(
    `${RARIBLE_API_PATH}/data/collections/ETHEREUM:${contractAddress}/stats?currency=ETH`,
    {
      method: 'GET',
    },
  );
  
  //   floorPrice: number;
  //   highestSale: number;
  //   items: number;
  //   marketCap: number;
  //   owners: number;
  //   volume: number;
  const data = await response.json();

  if (data.success === false) {
      throw new Error(data.name)
  }

  return data;
};
