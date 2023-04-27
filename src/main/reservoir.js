import { parseEther, defaultAbiCoder } from 'ethers/lib/utils.js';

const RESERVOIR_API_BASE_URL = {
  '0x5': 'https://api-goerli.reservoir.tools',
  '0x1': 'https://api.reservoir.tools'
}

export const getAllOffers = async function (
  chainId,
  nftContractAddress,
  nftId
) {
  const options = {method: 'GET', headers: {accept: '*/*', 'x-api-key': process.env.RESERVOIR_API_KEY}};
  const reqURL = `${RESERVOIR_API_BASE_URL[chainId]}/orders/bids/v5?includeRawData=true&token=${nftContractAddress}%3A${nftId}&sortBy=price`;
  const response = await fetch(reqURL, options);
  const data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
  return data.orders;
}

export const getAllListing = async function (
  chainId,
  nftContractAddress,
  nftId
) {
  const options = {method: 'GET', headers: {accept: '*/*', 'x-api-key': process.env.RESERVOIR_API_KEY}};
  const reqURL = `${RESERVOIR_API_BASE_URL[chainId]}/orders/asks/v4?includeRawData=true&token=${nftContractAddress}%3A${nftId}&sortBy=price`;
  const response = await fetch(reqURL, options);
  const data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
  return data.orders;
}

export const getTopWethOffer = async function (
  chainId,
  nftContractAddress,
  nftId
) {
  const allOrders = await getAllOffers(chainId, nftContractAddress, nftId);

  let order;
  let found = false;
  for (let i = 0; i < allOrders.length; i++) {
    if (allOrders[i].price.symbol = 'WETH') {
      order = allOrders[i];
      found=true;
    }
  }
  if (!found)
    return;
  else
    return order;
}

export const createListing = async function (
  chainId,
  nftContractAddress,
  nftId,
  listPrice,
  signer,
  orderbook
) {
  let options = {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY
    },
    body: JSON.stringify({
      params: [
        {
          orderKind: 'seaport-v1.4',
          orderbook: orderbook,
          automatedRoyalties: false,
          currency: '0x0000000000000000000000000000000000000000',
          token: `${nftContractAddress}:${nftId}`,
          weiPrice: parseEther(String(listPrice)).toString(),
          expirationTime: '1713561540'
        }
      ],
      maker: signer.address
    })
  };
  
  let response = await fetch(`${RESERVOIR_API_BASE_URL[chainId]}/execute/list/v5`, options);
  let data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }

  const toSignData = data.steps[1].items[0].data.sign;
  const signature = await signer._signTypedData(toSignData.domain, toSignData.types, toSignData.value);

  options = {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY
    },
    body: JSON.stringify({
      items: [
        data.steps[1].items[0].data.post.body
      ]
    })
  };

  console.log(options);
  response = await fetch(`${RESERVOIR_API_BASE_URL[chainId]}/order/v4?signature=${signature}`, options);
  data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
}



export const createPurchaseOffer = async function (
  chainId,
  nftContractAddress,
  nftId,
  offerPrice,
  currencyToken,
  signer
) {
  let options = {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY
    },
    body: JSON.stringify({
      params: [
        {
          orderKind: 'seaport-v1.4',
          orderbook: 'reservoir',
          automatedRoyalties: false,
          token: `${nftContractAddress}:${nftId}`,
          weiPrice: parseEther(String(offerPrice)).toString(),
          expirationTime: '1713561540',
          currency: currencyToken
        }
      ],
      maker: signer.address
    })
  };
  
  let response = await fetch(`${RESERVOIR_API_BASE_URL[chainId]}/execute/bid/v5`, options);
  let data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
  const toSignData = data.steps[2].items[0].data.sign;
  const signature = await signer._signTypedData(toSignData.domain, toSignData.types, toSignData.value);
  console.log(data);
  options = {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'x-api-key': process.env.RESERVOIR_API_KEY
    },
    body: JSON.stringify({
      items: [
        data.steps[2].items[0].data.post.body
      ]
    })
  };

  response = await fetch(`${RESERVOIR_API_BASE_URL[chainId]}/order/v4?signature=${signature}`, options);
  data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
}

export const encodeRawSeaportOrderData = function (rawData) {
  console.log(rawData);
  const offerStruct = {
    parameters: {
      offerer: rawData.offerer,
      zone: rawData.zone,
      offer: rawData.offer,
      consideration: rawData.consideration,
      orderType: rawData.orderType,
      startTime: rawData.startTime,
      endTime: rawData.endTime,
      zoneHash: rawData.zoneHash,
      salt: rawData.salt,
      conduitKey: rawData.conduitKey,
      totalOriginalConsiderationItems: rawData.consideration.length
    },
    signature: rawData.signature,
  };
  
  const offerDataEncoded = defaultAbiCoder.encode(
    ['tuple(tuple(address offerer, address zone, tuple(uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount)[] offer, tuple(uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount, address payable recipient)[] consideration, uint8 orderType, uint256 startTime, uint256 endTime, bytes32 zoneHash, uint256 salt, bytes32 conduitKey, uint256 totalOriginalConsiderationItems) parameters, bytes signature) order'],
    [offerStruct]
  );
  return offerDataEncoded;
}

export const getNftAskPrice = async function (
  chainId,
  nftContractAddress,
  nftId
) {
  const options = {
    method: 'GET',
    headers: {accept: '*/*', 'x-api-key': process.env.RESERVOIR_API_KEY}
  };
  
  const response = await fetch(`${RESERVOIR_API_BASE_URL[chainId]}/tokens/v6?tokens=${nftContractAddress}%3A${nftId}`, options)
  const data = await response.json();
  if (data.success === false || data.statusCode === 400) {
    console.log(data);
    process.exit();
  }
  if (data.tokens && data.tokens.length>0 ) {
    const price = data.tokens[0].market.floorAsk.price.amount.raw;
    const askOrderId = data.tokens[0].market.floorAsk.id;
    return {price, askOrderId};
  }
}