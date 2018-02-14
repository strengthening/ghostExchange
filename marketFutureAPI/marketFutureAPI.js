const C = require('../constant/define');

const okexMarketAPI = require('./okexAPI/marketFutureAPI');

class MarketFutureAPI{
    constructor(config){
        this._config = config;
    }

    reqTicker(symbol, exchange, contractType){

        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await okexMarketAPI.reqFutureTickerData(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await okexMarketAPI.reqFutureTickerData(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqDepth(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await okexMarketAPI.reqFutureDepthData(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await okexMarketAPI.reqFutureDepthData(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqMinKline(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await okexMarketAPI.reqFutureMinKlineData(symbol, contract_type);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await okexMarketAPI.reqFutureMinKlineData(symbol, contract_type);
            return resolve([dataObj, err]);
        });
    }

    reqDayKline(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await okexMarketAPI.reqFutureDayKlineData(symbol, contract_type);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await okexMarketAPI.reqFutureDayKlineData(symbol, contract_type);
            return resolve([dataObj, err]);
        });
    }

    reqPriceLimit(symbol, exchange, contract_type){
        return new Promise(async (resolve) =>{
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await okexMarketAPI.reqFuturePriceLimit(symbol, contract_type);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await okexMarketAPI.reqFuturePriceLimit(symbol, contract_type);
            return resolve([dataObj, err]);
        });
    }
}

module.exports = MarketFutureAPI;