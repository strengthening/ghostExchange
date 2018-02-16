const C = require('../constant/define');

const OkexMarketFutureAPI = require('./okexAPI/marketFutureAPI');

class MarketFutureAPI{
    constructor(config){
        this._config = config;
        this._okexMarketFutureAPI = new OkexMarketFutureAPI(config.okex);
    }

    reqTicker(symbol, exchange, contractType){

        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await this._okexMarketFutureAPI.reqTicker(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await this._okexMarketFutureAPI.reqTicker(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqDepth(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await this._okexMarketFutureAPI.reqDepth(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await this._okexMarketFutureAPI.reqDepth(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqMinKline(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await this._okexMarketFutureAPI.reqMinKline(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await this._okexMarketFutureAPI.reqMinKline(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqDayKline(symbol, exchange, contractType){
        return new Promise(async (resolve) => {
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await this._okexMarketFutureAPI.reqDayKline(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await this._okexMarketFutureAPI.reqDayKline(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }

    reqPriceLimit(symbol, exchange, contractType){
        return new Promise(async (resolve) =>{
            let [dataObj, err] = [undefined, undefined];
            if (exchange === C.EXCHANGE_OKEX) {
                [dataObj, err] = await this._okexMarketFutureAPI.reqPriceLimit(symbol, contractType);
                return resolve([dataObj, err]);
            }

            [dataObj, err] = await this._okexMarketFutureAPI.reqPriceLimit(symbol, contractType);
            return resolve([dataObj, err]);
        });
    }
}

module.exports = MarketFutureAPI;