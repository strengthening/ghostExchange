const C = require('../../constant/define');

const FutureTradeOkex = require('./okex');

class FutureTrade {

    constructor(config) {
        this._config = config;
        this._okex = new FutureTradeOkex(this._config.okex);
    }

    userInfo(exchange) {
        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.userInfo();
        }

        return this._okex.userInfo();
    }

    orderInfo(symbol, exchange, contract_type, order_id) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.orderInfo(symbol, contract_type, order_id);
        }

        return this._okex.orderInfo(symbol, contract_type, order_id);
    }

    cancel(symbol, exchange, contract_type, order_id){
        if(exchange === C.EXCHANGE_OKEX){
            return this._okex.cancel(symbol, contract_type, order_id);
        }
        return this._okex.cancel(symbol, contract_type, order_id);
    }

    cancelOrderInfo(symbol, exchange, contract_type, order_id) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.cancelOrderInfo(symbol, contract_type, order_id);
        }

        return this._okex.cancelOrderInfo(symbol, contract_type, order_id);
    }

    openLong(symbol, exchange, contract_type, amount, price, lever_rate) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.openLong(symbol, contract_type, amount, price, lever_rate);
        }

        return this._okex.openLong(symbol, contract_type, amount, price, lever_rate);
    }

    openShort(symbol, exchange, contract_type, amount, price, lever_rate) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.openShort(symbol, contract_type, amount, price, lever_rate);
        }

        return this._okex.openShort(symbol, contract_type, amount, price, lever_rate);
    }

    liquidateLong(symbol, exchange, contract_type, amount, price, lever_rate) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.liquidateLong(symbol, contract_type, amount, price, lever_rate);
        }

        return this._okex.liquidateLong(symbol, contract_type, amount, price, lever_rate);
    }

    liquidateShort(symbol, exchange, contract_type, amount, price, lever_rate) {

        if (exchange === C.EXCHANGE_OKEX) {
            return this._okex.liquidateShort(symbol, contract_type, amount, price, lever_rate);
        }

        return this._okex.liquidateShort(symbol, contract_type, amount, price, lever_rate);
    }
}

module.exports = FutureTrade;
