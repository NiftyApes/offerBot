import { createOffer } from "./api.js";

const response = await createOffer(
    {
        nftContractAddress: "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63", 
        nftId: 1662,
        chainId: '0x1',
        withSignature: false
    });

console.log(response);