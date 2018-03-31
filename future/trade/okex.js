const crypto = require('crypto');

const C = require('../../constant/define');

const http = require('../../http/define');
const time = require('../../time/define');
const pms = require('../../promise/define');

class FutureTradeOkex {

    constructor(config) {
        this._config = config;
    }

    userInfo() {
        return new Promise((resolve) => {
            let param = this.sign({
                api_key: this._config.api_key
            }, this._config.secret_key);

            http.post(this._config.base_url + '/api/v1/future_userinfo.do', param)
                .then((dataStr) => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, (err) => {
                    return resolve([undefined, err]);
                });
        });
    }

    orderInfo(symbol, contract_type, order_id) {
        let param = this.sign({
            symbol, contract_type, order_id,
            api_key: this._config.api_key
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.post(this._config.base_url + '/api/v1/future_order_info.do', param)
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

        return new Promise(async resolve => {
            let param = this.sign({
                symbol, contract_type, order_id,
                api_key: this._config.api_key
            }, this._config.secret_key);

            await time.delay(20);
            let [orderObj, orderErr] = await this.orderInfo(symbol, contract_type, order_id);

            if (orderObj && orderObj.orders && orderObj.orders.length > 0 &&
                (orderObj.orders[0].status === 2 || orderObj.orders[0].status === -1)) {
                return resolve([orderObj, orderErr]);
            }

            let [dataStr, dataErr] = await pms.standard(http
                .post(this._config.base_url + '/api/v1/future_cancel.do', param));

            //如果是频繁操作，则等待一个随机时间再次撤销
            while (dataErr && typeof dataErr === 'string' && dataErr.indexOf('20049')) {
                await time.delay(Math.random() * 2000 + 2000);
                [dataStr, dataErr] = await pms.standard(http
                    .post(this._config.base_url + '/api/v1/future_cancel.do', param));
            }

            if (dataErr)
                return resolve([undefined, dataErr]);

            let dataObj = JSON.parse(dataStr);
            let err = undefined;

            if (!dataObj.result && dataObj.error_code !== 20015 && dataObj.error_code !== 20014)
                return resolve([undefined, dataStr]);

            for (let idx = 0; idx < 15; idx++) {

                [dataObj, err] = await this.orderInfo(symbol, contract_type, order_id);
                if (err) return resolve([undefined, err]);
                //此处有时会返回{result:true,orders:[]}，所以必须进行数组长度判断
                if (orderObj &&
                    orderObj.orders.length > 0 &&
                    (dataObj.orders[0].status === 2 || dataObj.orders[0].status === -1)) {
                    return resolve([dataObj, err]);
                }
                await time.delay(500);
            }

            return resolve([undefined, 'Try too many times to get order: ' + order_id]);

        });
    }

    openLong(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.LEVER_RATE_OKEX_LEVEL1 &&
            lever_rate !== C.LEVER_RATE_OKEX_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.LEVER_RATE_OKEX_LEVEL1;
        }

        let param = this.sign({
            symbol, contract_type,
            price, amount, lever_rate,
            api_key: this._config.api_key,
            type: C.OPEN_LONG_OKEX,
            match_price: 0
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.post(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };

    openShort(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.LEVER_RATE_OKEX_LEVEL1 &&
            lever_rate !== C.LEVER_RATE_OKEX_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.LEVER_RATE_OKEX_LEVEL1;
        }

        let param = this.sign({
            symbol, contract_type,
            price, amount, lever_rate,
            api_key: this._config.api_key,
            type: C.OPEN_SHORT_OKEX,
            match_price: 0
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.post(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);

                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };

    liquidateLong(symbol, contract_type, amount, price, lever_rate) {

        if (lever_rate !== C.LEVER_RATE_OKEX_LEVEL1 &&
            lever_rate !== C.LEVER_RATE_OKEX_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.LEVER_RATE_OKEX_LEVEL1;
        }
        let param = this.sign({
            symbol, contract_type,
            price, amount, lever_rate,
            type: C.LIQUIDATE_LONG_OKEX,
            match_price: 0, api_key: this._config.api_key
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.post(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    }

    liquidateShort(symbol, contract_type, amount, price, lever_rate) {
        if (lever_rate !== C.LEVER_RATE_OKEX_LEVEL1 &&
            lever_rate !== C.LEVER_RATE_OKEX_LEVEL2) {
            //默认开启10倍杠杆
            lever_rate = C.LEVER_RATE_OKEX_LEVEL1;
        }

        let param = this.sign({
            symbol, contract_type,
            price, amount, lever_rate,
            type: C.LIQUIDATE_SHORT_OKEX,
            api_key: this._config.api_key,
            match_price: 0
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.post(this._config.base_url + '/api/v1/future_trade.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    };

    sign(param, secret) {

        let keyArr = Object.keys(param).sort();
        let signStr = '';
        for (let i = 0; i < keyArr.length; i++) {
            signStr += keyArr[i] + '=' + param[keyArr[i]] + '&';
        }
        signStr = signStr + 'secret_key=' + secret;
        let md5 = crypto.createHash('md5');
        md5.update(signStr);
        param['sign'] = md5.digest('hex').toLocaleUpperCase();  //MD5值

        return param;
    }
}

module.exports = FutureTradeOkex;
