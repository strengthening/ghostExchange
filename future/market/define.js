const C = require('../../constant/define');

const FutureMarketOkex = require('./okex');

class FutureMarket {

    constructor(config) {
        this._config = config;
        this._okex = new FutureMarketOkex(this._config.okex);
    }

    tick(symbol, exchange, contract_type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.tick(symbol, contract_type);
        }
        return this._okex.tick(symbol, contract_type);
    }

    depth(symbol, exchange, contract_type){
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.depth(symbol, contract_type);
        }
        return this._okex.depth(symbol, contract_type);
    }

    limit(symbol, exchange, contract_type){
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.limit(symbol, contract_type);
        }
        return this._okex.limit(symbol, contract_type);

    }

    minKline(symbol, exchange, contract_type){

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.minKline(symbol, contract_type);
        }
        return this._okex.minKline(symbol, contract_type);
    }

    dayKline(symbol, exchange, contract_type){
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.dayKline(symbol, contract_type);
        }
        return this._okex.dayKline(symbol, contract_type);
    }

}

module.exports = FutureMarket;