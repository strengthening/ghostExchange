const crypto = require('crypto');

const E = require('../../error/define');

const http = require('../../http/define');
const time = require('../../time/define');

class FutureMarketOkex {

    constructor(config) {
        this._config = config;
    }

    tick(symbol, contract_type) {
        let param = {symbol, contract_type};

        return new Promise(async (resolve) => {
            let lastErr = E.HTTP_RETRY_OUT;

            for (let retryTime = 0; retryTime < this._config.retry_time; retryTime++) {
                try {
                    let dataStr = await http.get(this._config.base_url + '/api/v1/future_ticker.do', param);
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }

            return resolve([undefined, lastErr]);
        });
    }

    depth(symbol, contract_type) {
        let param = {
            symbol, contract_type,
            size: 200, merge: 0    //不合并深度
        };

        return new Promise(async (resolve) => {
            let lastErr = E.HTTP_RETRY_OUT;

            for (let retryTime = 0; retryTime < this._config.retry_time; retryTime++) {
                try {
                    let dataStr = await http.get(this._config.base_url + '/api/v1/future_depth.do', param);
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    if (dataObj['asks']) {
                        dataObj['asks'].reverse(); //reverse the array
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

    kline(symbol,contract_type, type){
        return new Promise(async (resolve) => {
            let param = {
                symbol, contract_type, type,
                size: 300, since: 0
            };
            let lastErr = E.HTTP_RETRY_OUT;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .get(this._config.base_url + '/api/v1/future_kline.do', param);

                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

    minKline(symbol, contract_type) {

        let param = {
            symbol, contract_type,
            type: '1min', size: 300, since: 0
        };

        return new Promise(async (resolve) => {
            let lastErr = E.HTTP_RETRY_OUT;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .get(this._config.base_url + '/api/v1/future_kline.do', param);

                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

    dayKline(symbol, contract_type) {

        let param = {
            symbol, contract_type,
            type: '1day', size: 200,
            since: 0,
        };

        return new Promise(async (resolve) => {
            let lastErr = E.HTTP_RETRY_OUT;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .get(this._config.base_url + '/api/v1/future_kline.do', param);
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

    limit(symbol, contract_type) {
        let param = {symbol, contract_type};

        return new Promise(async (resolve) => {
            let lastErr = E.HTTP_RETRY_OUT;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .get(this._config.base_url + '/api/v1/future_price_limit.do', param);
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                    return resolve([dataObj, undefined]);
                } catch (err) {
                    lastErr = err;
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

    history(symbol, date, since) {

        let param = this.sign({
            symbol, date, since,
            api_key: this._config.api_key
        }, this._config.secret_key);

        return new Promise(async resolve => {
            let lastErr = E.HTTP_RETRY_OUT;
            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .post(this._config.base_url + '/api/v1/future_trades_history.do', param);
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.length && dataObj.length > 0) {
                        return resolve([dataObj, undefined]);
                    }
                    if (dataObj.result !== undefined && !dataObj.result) {
                        return resolve([undefined, dataStr]);
                    }
                } catch (err) {
                    lastErr = err;
                    await time.delay(5000);
                }
            }
            return resolve([undefined, lastErr]);
        });
    }

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

module.exports = FutureMarketOkex;
