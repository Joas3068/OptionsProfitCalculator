//Ref: https://gist.github.com/santacruz123/3623310
export default function GetSchole(lastItem) {
  var type = lastItem.type;
  var stockPrice = Number(lastItem.stockPrice);
  var strikeX = Number(lastItem.strikePrice);
  var timeYears = lastItem.expiration / 365;
  var r = lastItem.interestFree;
  var volatility = lastItem.volatility/100;

  var opAtPurch =
    BlackScholes(type, stockPrice, strikeX, timeYears, r, volatility) * 100;

  var results = {
    priceAtPurchase: stockPrice,
    optionPriceAtPurchase: opAtPurch,
    strikePrice: strikeX,
    optionPrice: [],
  };
  for (let index = stockPrice - 20; index < (stockPrice + 20); index += 0.75) {
    var BS = BlackScholes(type, index, strikeX, timeYears, r, volatility) * 100;
    if (lastItem.buySell === "buy" ||lastItem.buySell === "Buy")
    {
      results.optionPrice.push({
        oPrice: 1 * BS - results.optionPriceAtPurchase,
        sPrice: index,
      });
    }
    else {
      results.optionPrice.push({
        oPrice: (-1 * BS) + results.optionPriceAtPurchase,
        sPrice: index,
      });
    }

  }

  return results;
}

function BlackScholes(PutCallFlag, S, X, T, r, v) {
  var d1 = (Math.log(S / X) + (r + (v * v) / 2) * T) / (v * Math.sqrt(T));
  var d2 = d1 - v * Math.sqrt(T);
  if (PutCallFlag === "Call") {
    return S * CND(d1) - X * Math.exp(-r * T) * CND(d2);
  } else {
    return X * Math.exp(-r * T) * CND(-d2) - S * CND(-d1);
  }
}

/* The cummulative Normal distribution function: */
function CND(x) {
  if (x < 0) {
    return 1 - CND(-x);
  } else {
    var k = 1 / (1 + 0.2316419 * x);
    return (
      1 -
      (Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI)) *
        k *
        (0.31938153 +
          k *
            (-0.356563782 +
              k * (1.781477937 + k * (-1.821255978 + k * 1.330274429))))
    );
  }
}
