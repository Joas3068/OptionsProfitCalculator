export const CallDebitSpread = [
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 25,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

export const PutCreditSpread = [
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 56,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 52,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

export const LongCall = [
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

export const ShortPut = [
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

export const IronCondor = [
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 44,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 460,
    expiration: 6,
    interestFree: 0.02,
    volatility: 43,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 435,
    expiration: 6,
    interestFree: 0.02,
    volatility: 56,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 430,
    expiration: 6,
    interestFree: 0.02,
    volatility: 52,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];


export const Blank = {};

export default Blank;