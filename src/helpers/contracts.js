import { sellerFinancingAbi } from '../abis/SellerFinancing.abi.js';
import { makerAbi } from '../abis/Maker.abi.js';

export const sellerFinancing = (chainId) => {
  const sellerFinancingContract =
    chainId === '0x5'
      ? '0xf5Fa79D20d942a5210bF0FE9f5110102B8ECE955'
      : chainId === '0x1'
      ? '0x216A0b1Ee6D72A11F50450ed4d1BDe62170F6337'
      : '';

    return {
      address: sellerFinancingContract,
      abi: sellerFinancingAbi
    }
}

export const maker = (chainId) => {
  const makerContractAddress =
    chainId === '0x5'
      ? '0x216A0b1Ee6D72A11F50450ed4d1BDe62170F6337'
      : chainId === '0x1'
      ? '0x216A0b1Ee6D72A11F50450ed4d1BDe62170F6337'
      : '';

    return {
      address: makerContractAddress,
      abi: makerAbi
    }
}

export const seaportExecuter = (chainId) => {
  const seaportExecuterAddress =
    chainId === '0x5'
      ? '0x70eb1ed120940cd16c024267bf9bbbe253bef24e'
      : '';

    return {
      address: seaportExecuterAddress
    }
}
