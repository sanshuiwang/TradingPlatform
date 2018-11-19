import { getCoinList } from "../action";
import reducer, { initState } from "../reducer";

test("Get Coin List", () => {
  const state = initState;
  const expected = Object.keys({
    symbol: "ETHSGD",
    quoteAssetName: "SGD",
    tradedMoney: 357.0,
    baseAssetUnit: "",
    baseAssetName: "ETH",
    baseAsset: "ETH",
    tickSize: "0.0000001",
    prevClose: 140.0,
    activeBuy: 0.0,
    high: "140.0000000",
    lastAggTradeId: -1,
    low: "140.0000000",
    matchingUnitType: "STANDARD",
    close: "140.0000000",
    quoteAsset: "SGD",
    productType: null,
    active: true,
    minTrade: 0.01,
    activeSell: 2.55,
    withdrawFee: "10",
    volume: "2.5500000",
    decimalPlaces: 8,
    quoteAssetUnit: "",
    open: "140.0000000",
    status: "TRADING",
    minQty: 1e-8
  });

  const result = reducer(state, getCoinList());
  const rcL = result.coinList.length;
  if (rcL > 0) {
    const coinListItemKeys = Object.keys(result.coinList[0]);
    expect(coinListItemKeys).toEqual(expected);
  } else {
    expect(rcL).toEqual(0);
  }
});
