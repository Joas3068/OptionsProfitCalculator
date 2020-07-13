//Ref: https://gist.github.com/santacruz123/3623310

import TdDataMode from "../pages/TdDataMode";

//
export function GetSchole(lastItem) {
  var tempObject = lastItem;
  var pArr = [];
  tempObject.optionPriceAtPurchase =
    BlackScholes(
      tempObject.type,
      tempObject.stockPrice,
      tempObject.strikePrice,
      tempObject.expiration / 365, //needs to be in years
      tempObject.interestFree, //this will be in decimal format
      tempObject.volatility / 100 //divide by 100 to get percent
    ) * 100;
  for (let index = 0; index < tempObject.expiration; index++) {
    pArr.push(GetCalcArr(tempObject, index));
  }
  tempObject.priceArray = pArr;
  return tempObject;
}

export function CalcBScholesTdData(
  tdArr,
  stockPrice,
  interestRate,
  inputVolatility
) {
  var finalCalcs = [];

  if (tdArr.length > 0) {
    //cancel if exp > 150
    for (let checkExp = 0; checkExp < tdArr.length; checkExp++) {
      if (tdArr[checkExp].daysToExpiration > 150) return [];
    }
    var LargestExp = 0;
    var LargestVol = 0;
    tdArr.forEach((tData) => {
      if (tData.daysToExpiration > LargestExp)
        LargestExp = tData.daysToExpiration;
      if (tData.volatility > LargestVol) LargestVol = tData.volatility;
    });
    var deviation =
      (LargestVol / 100) * stockPrice * Math.sqrt((LargestExp + 1) / 365); //deviation calc based of volatility

    let multiplier = deviation * 3; //tweak graph size here, this will specify range from the stock price
    let res = (multiplier * 2 + stockPrice) / 2000; //2000 is the number of datapoints

    for (
      let index = stockPrice - multiplier;
      index < stockPrice + multiplier;
      index += res //this will change resolution of graph. the higher the number the less ticks
    ) {
      var entryAtStockPrice = {};
      entryAtStockPrice["x"] = +index.toFixed(2); //add stock price on x axis

      for (let i = 0; i < tdArr.length; i++) {
        //var entryAtStockPrice = {};

        for (let j = 0; j <= tdArr[i].daysToExpiration; j++) {
          //iterate through expirations

          var type = tdArr[i].putCall;
          var strikeX = Number(tdArr[i].strikePrice);
          var timeYears = (tdArr[i].daysToExpiration - j) / 365;
          var r = interestRate;
          var volatility = tdArr[i].volatility / 100;
          var BS =
            BlackScholes(type, index, strikeX, timeYears, r, volatility) * 100; //current price
          var sign = tdArr[i].buySell === "sell" ? -1 : 1;
          if (entryAtStockPrice["DAY" + (j + 1)] === undefined)
            entryAtStockPrice["DAY" + (j + 1)] = 0;
          if (isNaN(BS)) BS = 0;
          var tempEnt = entryAtStockPrice["DAY" + (j + 1)];
          entryAtStockPrice["DAY" + (j + 1)] = +(
            Number.parseFloat(tdArr[i].numberOfContracts) *
              (sign * BS - sign * tdArr[i].theoreticalOptionValue * 100) +
            tempEnt
          ).toFixed(GetFixedValue(stockPrice));
        }
      }
      finalCalcs.push(entryAtStockPrice);
    }
    return finalCalcs;
  } else return [];
}

export function GetBreakEvens(checksList) {
  // for (let i = 0; i < checksList.length; i++) {
  //   let exp = checksList[i].expiration;
  //   while (exp !== 0) {
  //     checksList[i].breakEvens.push(
  //       checksList[i].optionPriceAtPurchase -
  //         BlackScholes(
  //           checksList[i].type,
  //           checksList[i].stockPrice,
  //           checksList[i].strikePrice,
  //           exp / 365, //needs to be in years
  //           checksList[i].interestFree, //this will be in decimal format
  //           checksList[i].volatility / 100 //divide by 100 to get percent
  //         ) *
  //           100
  //     );
  //     exp--;
  //   }
  // }
}

export function CalcBScholes(checksList) {
  var finalCalcs = [];

  if (checksList.length > 0) {
    var stockPrice = Number(checksList[0].stockPrice); //get starting price

    //cancel if exp > 150
    for (let checkExp = 0; checkExp < checksList.length; checkExp++) {
      if (checksList[checkExp].expiration > 150) return [];
    }

    let multiplier = Math.floor(stockPrice / 12); //tweak graph size here
    for (
      let index = stockPrice - multiplier;
      index < stockPrice + multiplier;
      index += 0.1 //this will change resolution of graph. the higher the number the less ticks
    ) {
      var entryAtStockPrice = {};
      entryAtStockPrice["x"] = +index.toFixed(2); //add stock price on x axis
      for (let i = 0; i < checksList.length; i++) {
        //var entryAtStockPrice = {};

        //add price at purchase. replace with API data
        if (checksList.optionPriceAtPurchase === undefined) {
          checksList[i].optionPriceAtPurchase =
            BlackScholes(
              checksList[i].type,
              checksList[i].stockPrice,
              checksList[i].strikePrice,
              checksList[i].expiration / 365, //needs to be in years
              checksList[i].interestFree, //this will be in decimal format
              checksList[i].volatility / 100 //divide by 100 to get percent
            ) * 100;
          //Sell contracts are neg
          if (checksList[i].buySell === "sell")
            checksList[i].optionPriceAtPurchase *= -1;
        }

        for (let j = 0; j <= checksList[i].expiration; j++) {
          //iterate through expirations

          var type = checksList[i].type;
          var strikeX = Number(checksList[i].strikePrice);
          var timeYears = (checksList[i].expiration - j) / 365;
          var r = checksList[i].interestFree;
          var volatility = checksList[i].volatility / 100;
          var BS =
            BlackScholes(type, index, strikeX, timeYears, r, volatility) * 100; //current price
          var sign = checksList[i].buySell === "sell" ? -1 : 1;
          if (entryAtStockPrice["DAY" + (j + 1)] === undefined)
            entryAtStockPrice["DAY" + (j + 1)] = 0;
          if (isNaN(BS)) BS = 0;
          var tempEnt = entryAtStockPrice["DAY" + (j + 1)];
          entryAtStockPrice["DAY" + (j + 1)] = +(
            Number.parseFloat(checksList[i].numberOfContracts) *
              (sign * BS - checksList[i].optionPriceAtPurchase) +
            tempEnt
          ).toFixed(4);
        }
      }
      finalCalcs.push(entryAtStockPrice);
    }
    return finalCalcs;
  } else return [];
}

function GetCalcArr(lastItem, i) {
  var type = lastItem.type;
  var stockPrice = Number(lastItem.stockPrice);
  var strikeX = Number(lastItem.strikePrice);
  var timeYears = (lastItem.expiration - i) / 365;
  var r = lastItem.interestFree;
  var volatility = lastItem.volatility / 100;

  var pArr = [];
  let multiplier = Math.floor(stockPrice / (6 * (1 / volatility))); //tweak graph size here
  for (
    let index = stockPrice - multiplier;
    index < stockPrice + multiplier;
    index += (multiplier * 2) / stockPrice //this will change resolution of graph. the higher the number the less ticks
  ) {
    var BS = BlackScholes(type, index, strikeX, timeYears, r, volatility) * 100;
    if (lastItem.buySell === "buy") {
      pArr.push({
        oPrice: 1 * BS - lastItem.optionPriceAtPurchase, //If buy
        sPrice: index,
      });
    } else {
      pArr.push({
        oPrice: -1 * BS + lastItem.optionPriceAtPurchase, //If sell
        sPrice: index,
      });
    }
  }

  return pArr;
}

function BlackScholes(PutCallFlag, S, X, T, r, v) {
  var d1 = (Math.log(S / X) + (r + (v * v) / 2) * T) / (v * Math.sqrt(T));
  var d2 = d1 - v * Math.sqrt(T);
  if (PutCallFlag === "call" || PutCallFlag === "CALL") {
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

//Calculates what value to fix prices to so resolution is the same on the chart
function GetFixedValue(stockPrice) {
  var temp = stockPrice;
  let place = 1;
  while (temp > 10) {
    temp = temp / 10;
    place++;
  }
  let fixed = 2;
  switch (place) {
    case 1:
      fixed = 6;
      break;
    case 2:
      fixed = 4;
      break;
    case 3:
      fixed = 2;
      break;
    case fixed >= 4:
      fixed = 1;
      break;
    default:
      fixed = 2;
      break;
  }
  return fixed;
}
