export function getApiUrl(chainId, path) {
  const chainName =
    chainId === '0x7a69'
      ? 'DEV'
      : chainId === '0x5'
      ? 'GOERLI'
      : chainId === '0x1'
      ? 'MAINNET'
      : chainId === '0x64'
      ? 'GNOSIS'
      : '';

  const apiBaseUri = `https://api.niftyapes.money/${chainName}/`;

  return `${apiBaseUri}v1/${path}`;
}
