const C = require('../../constant/define');

const http = require('../../util/http');
const time = require('../../util/time');

class OkexTradeFutureAPI {

    constructor(config) {
        this._config = config;
    }

    reqUserInfo() {
        let param = http.buildParam({
            api_key: this._config.api_key
        }, this._config.secret_key);

        return new Promise(async (resolve) => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_userinfo.do', param)
                .then((dataStr) => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, (err) => {
                    return resolve([undefined, err]);
                });
        });
    }

    reqOrderInfo(symbol, contract_type, order_id) {
        let param = http.buildParam({
            symbol: symbol,
            contract_type: contract_type,
            api_key: this._config.api_key,
            order_id: order_id
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_order_info.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    }

    cancelOrderInfo(symbol, contract_type, order_id) {
        let param = http.buildParam({
            symbol: symbol,
            contract_type: contract_type,
            api_key: this._config.api_key,
            order_id: order_id
        }, this._config.secret_key);

        return new Promise(async resolve => {
            await time.setTimeout(20);
            let [orderObj, orderErr] = await this.reqOrderInfo(symbol, contract_type, order_id);
            if (orderObj && orderObj.orders && orderObj.orders.length > 0 &&
                (orderObj.orders[0].status === 2 || orderObj.orders[0].status === -1)) {
                return resolve([orderObj, orderErr]);
            }

            let [dataStr, dataErr] = await http.getStdPromise(http.postPromiseReq(this._config.base_url + '/api/v1/future_cancel.do', param));

            //如果是频繁操作，则等待一个随机时间再次撤销
            while (dataErr && typeof dataErr === 'string' && dataErr.indexOf('20049')) {
                await time.setTimeout(Math.random() * 2000 + 2000);
                [dataStr, dataErr] = await http.getStdPromise(http.postPromiseReq(this._config.base_url + '/api/v1/future_cancel.do', param));
            }

            if (dataErr) {
                return resolve([undefined, dataErr]);
            }

            let dataObj = JSON.parse(dataStr);
            let err = undefined;

            if (!dataObj.result && dataObj.error_code !== 20015 && dataObj.error_code !== 20014) return resolve([undefined, dataStr]);

            for (let idx = 0; idx < 15; idx++) {

                [dataObj, err] = await this.reqOrderInfo(symbol, contract_type, order_id);
                if (err) return resolve([undefined, err]);
                //此处有时会返回{result:true,orders:[]}，所以必须进行数组长度判断
                if (orderObj &&
                    orderObj.orders.length > 0 &&
                    (dataObj.orders[0].status === 2 || dataObj.orders[0].status === -1)) {
                    return resolve([dataObj, err]);
                }
                await time.setTimeout(500);
            }

            return resolve([undefined, 'Try too many times to get order: ' + order_id]);

        });
    }

    reqOpenLong(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.OKEX_LEVER_RATE_LEVEL1 &&
            lever_rate !== C.OKEX_LEVER_RATE_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.OKEX_LEVER_RATE_LEVEL1;
        }

        let param = http.buildParam({
            symbol: symbol,
            contract_type: contract_type,
            api_key: this._config.api_key,
            price: price,
            amount: amount,
            type: C.OKEX_OPEN_LONG,
            match_price: 0,
            lever_rate: lever_rate
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };

    reqOpenShort(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.OKEX_LEVER_RATE_LEVEL1 &&
            lever_rate !== C.OKEX_LEVER_RATE_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.OKEX_LEVER_RATE_LEVEL1;
        }

        let param = http.buildParam({
            symbol: symbol,
            contract_type: contract_type,
            api_key: this._config.api_key,
            price: price,
            amount: amount,
            type: C.OKEX_OPEN_SHORT,
            match_price: 0,
            lever_rate: lever_rate
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);

                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };

    reqLiquidateLong(symbol, contract_type, amount, price, lever_rate){

        if (lever_rate !== C.OKEX_LEVER_RATE_LEVEL1 &&
            lever_rate !== C.OKEX_LEVER_RATE_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.OKEX_LEVER_RATE_LEVEL1;
        }
        let param = http.buildParam({
            symbol: symbol, contract_type: contract_type,
            api_key: this._config.api_key,
            price: price, amount: amount,
            type: C.OKEX_LIQUIDATE_LONG,
            match_price: 0, lever_rate: lever_rate
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    }

    reqLiquidateShort(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.OKEX_LEVER_RATE_LEVEL1 &&
            lever_rate !== C.OKEX_LEVER_RATE_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.OKEX_LEVER_RATE_LEVEL1;
        }

        let param = http.buildParam({
            symbol: symbol, contract_type: contract_type,
            api_key: this._config.api_key,
            price: price, amount: amount,
            type: C.OKEX_LIQUIDATE_SHORT,
            match_price: 0, lever_rate: lever_rate
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };
}

module.exports = OkexTradeFutureAPI;
