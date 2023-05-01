export const sellerFinancingAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountReceived",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minExpectedAmount",
        "type": "uint256"
      }
    ],
    "name": "AmountReceivedLessThanRequiredMinimumPayment",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CannotBuySellerFinancingTicket",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CollectionOfferLimitReached",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ConditionSendValueFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "downPaymentAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "offerPrice",
        "type": "uint256"
      }
    ],
    "name": "DownPaymentGreaterThanOrEqualToOfferPrice",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExecuteOperationFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "saleAmountReceived",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minSaleAmountRequired",
        "type": "uint256"
      }
    ],
    "name": "InsufficientAmountReceivedFromSale",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountRequested",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "contractBalance",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msgValueSent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minMsgValueExpected",
        "type": "uint256"
      }
    ],
    "name": "InsufficientMsgValue",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "expected",
        "type": "address"
      }
    ],
    "name": "InvalidCaller",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "given",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "expected",
        "type": "uint256"
      }
    ],
    "name": "InvalidConsideration0Identifier",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "enum ISeaport.ItemType",
        "name": "given",
        "type": "uint8"
      },
      {
        "internalType": "enum ISeaport.ItemType",
        "name": "expected",
        "type": "uint8"
      }
    ],
    "name": "InvalidConsiderationItemType",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "given",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "expected",
        "type": "address"
      }
    ],
    "name": "InvalidConsiderationToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ownerTokenBalance",
        "type": "uint256"
      }
    ],
    "name": "InvalidIndex",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "givenMinPrincipalPerPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxMinPrincipalPerPeriod",
        "type": "uint256"
      }
    ],
    "name": "InvalidMinimumPrincipalPerPeriod",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "enum ISeaport.ItemType",
        "name": "given",
        "type": "uint8"
      },
      {
        "internalType": "enum ISeaport.ItemType",
        "name": "expected",
        "type": "uint8"
      }
    ],
    "name": "InvalidOffer0ItemType",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "given",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "expected",
        "type": "address"
      }
    ],
    "name": "InvalidOffer0Token",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPeriodDuration",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "expected",
        "type": "address"
      }
    ],
    "name": "InvalidSigner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanAlreadyClosed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanNotInDefault",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NftIdsMustMatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "NotNftOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OfferExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "SanctionedAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SeaportOrderNotFulfilled",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "SignatureNotAvailable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SoftGracePeriodEnded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WethConversionFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "AssetSeized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiverAddress",
        "type": "address"
      }
    ],
    "name": "FlashClaim",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "saleAmount",
        "type": "uint256"
      }
    ],
    "name": "InstantSell",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "ListedOnSeaport",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "ListingCancelledSeaport",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "LoanExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "LoanRepaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "price",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "downPaymentAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "expiration",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "collectionOfferLimit",
            "type": "uint64"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Offer",
        "name": "offer",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "OfferSignatureUsed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalRoyaltiesPaid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "interestPaid",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "PaymentMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "_requireAvailableSignature",
    "outputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "price",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "downPaymentAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "expiration",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "collectionOfferLimit",
            "type": "uint64"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Offer",
        "name": "offer",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      }
    ],
    "name": "buyWithFinancing",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "loan",
        "type": "tuple"
      }
    ],
    "name": "calculateMinimumPayment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "minimumPayment",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "periodInterest",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "delegateRegistryContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "getCollectionOfferCount",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "count",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      }
    ],
    "name": "getLoan",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "buyerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sellerNftId",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "remainingPrincipal",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodEndTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodBeginTimestamp",
            "type": "uint32"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Loan",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "price",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "downPaymentAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "expiration",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "collectionOfferLimit",
            "type": "uint64"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Offer",
        "name": "offer",
        "type": "tuple"
      }
    ],
    "name": "getOfferHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "getOfferSignatureStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "price",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "downPaymentAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "expiration",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "collectionOfferLimit",
            "type": "uint64"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Offer",
        "name": "offer",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "getOfferSigner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sellerFinancingTicketId",
        "type": "uint256"
      }
    ],
    "name": "getUnderlyingNft",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.UnderlyingNft",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newRoyaltiesEngineContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newDelegateRegistryContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newSeaportContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newWethContractAddress",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minProfitAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "instantSell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      }
    ],
    "name": "makePayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pauseSanctions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "royaltiesEngineContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "seaportContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nftId",
        "type": "uint256"
      }
    ],
    "name": "seizeAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpauseSanctions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newDelegateRegistryContractAddress",
        "type": "address"
      }
    ],
    "name": "updateDelegateRegistryContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newRoyaltiesEngineContractAddress",
        "type": "address"
      }
    ],
    "name": "updateRoyaltiesEngineContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newSeaportContractAddress",
        "type": "address"
      }
    ],
    "name": "updateSeaportContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newWethContractAddress",
        "type": "address"
      }
    ],
    "name": "updateWethContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wethContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "price",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "downPaymentAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "minimumPrincipalPerPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "periodInterestRateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "periodDuration",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "expiration",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "collectionOfferLimit",
            "type": "uint64"
          }
        ],
        "internalType": "struct ISellerFinancingStructs.Offer",
        "name": "offer",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "withdrawOfferSignature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]