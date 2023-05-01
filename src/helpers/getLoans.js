import { getApiUrl } from './getApiUrl.js';
import qs from 'query-string';

export const getLoans = async function (
  chainId,
  seller,
  buyer
) {
  const url = qs.stringifyUrl({
    url: 'loans',
    query: {
      seller: seller,
      buyer: buyer
    }
  });
  console.log(getApiUrl(chainId, url));
  const response = await fetch(getApiUrl(chainId, url), {
    method: 'GET'
  });

  const data = await response.json();

  if (data.success === false) {
    throw new Error(data.name);
  }

  return data;
}
