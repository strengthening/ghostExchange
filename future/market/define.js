const C = require('../../constant/define');

const time = require('../../time/define');
const defaultConf = require('../../config/exchange.json');

const FutureMarketOkex = require('./okex');

class FutureMarket {

    constructor(config) {

        if (config.okex)
            Object.assign(defaultConf.okex, config.okex);

        if (config.hbpro)
            Object.assign(defaultConf.hbpro, config.hbpro);

        this._config = defaultConf;
        this._okex = new FutureMarketOkex(this._config.okex);
    }

    tick(symbol, exchange, contract_type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.tick(symbol, contract_type);
        }
        return this._okex.tick(symbol, contract_type);
    }

    depth(symbol, exchange, contract_type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.depth(symbol, contract_type);
        }
        return this._okex.depth(symbol, contract_type);
    }

    limit(symbol, exchange, contract_type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.limit(symbol, contract_type);
        }
        return this._okex.limit(symbol, contract_type);

    }

    kline(symbol, exchange, contract_type, type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.kline(symbol, contract_type, type);
        }
        return this._okex.kline(symbol, contract_type, type);
    }

    minKline(symbol, exchange, contract_type) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.minKline(symbol, contract_type);
        }
        return this._okex.minKline(symbol, contract_type);
    }

    dayKline(symbol, exchange, contract_type) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.dayKline(symbol, contract_type);
        }
        return this._okex.dayKline(symbol, contract_type);
    }

    history(symbol, exchange, dueTimestamp, since) {
        if (exchange === C.EXCHANGE_OKEX) {
            let dateFmt = time.timestamp.string(dueTimestamp, C.DATE_STANDARD_FORMAT);
            return this._okex.history(symbol, dateFmt, since);
        }

        let dateFmt = time.timestamp.string(dueTimestamp, C.DATE_STANDARD_FORMAT);
        return this._okex.history(symbol, dateFmt, since);
    }

}

module.exports = FutureMarket;
