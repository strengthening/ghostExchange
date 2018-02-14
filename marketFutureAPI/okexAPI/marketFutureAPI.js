const E = require('../../error/define');

const http = require('../../util/http');
const time = require('../../util/time');

class OkexMarketFutureAPI {

    constructor(config) {
        this._config = config;
    }

    reqTicker(symbol, contract_type) {
        let param = {
            symbol: symbol,
            contract_type: contract_type,
        };

        return new Promise(async (resolve) => {
            let lastErr = E.ERR_HTTP_RETRY;

            for (let retryTime = 0; retryTime < this._config.retry_time; retryTime++) {
                try {
                    let dataStr = await http.getPromiseReq(this._config.base_url + '/api/v1/future_ticker.do', param);
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

    reqDepth(symbol, contract_type) {
        let param = {
            symbol: symbol,
            contract_type: contract_type,
            size: 200,
            merge: 0    //不合并深度
        };

        return new Promise(async (resolve) => {
            let lastErr = E.ERR_HTTP_RETRY;

            for (let retryTime = 0; retryTime < this._config.retry_time; retryTime++) {
                try {
                    let dataStr = await http.getPromiseReq(this._config.base_url + '/api/v1/future_depth.do', param);
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

    reqMinKline(symbol, contract_type) {

        let param = {
            symbol: symbol,
            type: '1min',
            contract_type: contract_type,
            size: 300,
            since: 0,
        };

        return new Promise(async (resolve) => {
            let lastErr = E.ERR_HTTP_RETRY;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .getPromiseReq(this._config.base_url + '/api/v1/future_kline.do', param);

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

    reqDayKline(symbol, contract_type) {

        let param = {
            symbol: symbol,
            type: '1day',
            contract_type: contract_type,
            size: 200,
            since: 0,
        };

        return new Promise(async (resolve) => {
            let lastErr = E.ERR_HTTP_RETRY;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .getPromiseReq(this._config.base_url + '/api/v1/future_kline.do', param);
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

    reqPriceLimit(symbol, contract_type) {
        let param = {
            symbol: symbol,
            contract_type: contract_type
        };

        return new Promise(async (resolve) => {
            let lastErr = E.ERR_HTTP_RETRY;

            for (let i = 0; i < this._config.retry_time; i++) {
                try {
                    let dataStr = await http
                        .getPromiseReq(this._config.base_url + '/api/v1/future_price_limit.do', param);
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

    reqTradesHistory(symbol, dateFormat, since) {

        let param = http.buildParam({
            symbol: symbol,
            date: dateFormat,
            since: since,
            api_key: this._config.api_key
        }, this._config.secret_key);

        return new Promise(resolve => {
            http.postPromiseReq(this._config.base_url + '/api/v1/future_trades_history.do', param)
                .then(dataStr => {
                    let dataObj = JSON.parse(dataStr);
                    if (dataObj.length && dataObj.length > 0) return resolve([dataObj, undefined]);
                    return resolve([undefined, dataStr]);
                }, err => {
                    return resolve([undefined, err]);
                });
        });
    }

    reqAvailablePrice(symbol, contract_type) {

        return new Promise(async resolve => {
            let [kLines, kLinesErr] = await this.reqMinKline(symbol, contract_type);

            if (kLinesErr || kLines.length === 0) {
                return resolve([undefined, 'Get kline data error']);
            }

            let stdTimestamp = time.getThisMinTS() - 60 * 1000;
            let stdEndPrice = kLines[kLines.length - 1][4];
            kLines.forEach(function (kLine) {
                if (stdTimestamp === kLine[0]) {

                    stdEndPrice = kLine[4];
                }
            });

            return resolve([stdEndPrice, undefined]);
        });
    }
}

module.exports = OkexMarketFutureAPI;
