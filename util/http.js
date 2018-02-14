const request = require('request');
const crypto = require('crypto');

//get方法
exports.getPromiseReq = function (url, param) {

    const headers = {
        'User-Agent': 'request',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    let options = {
        url: this.generateHttpUrl(url,param),
        headers: headers,
        forever: true,
        // proxy: 'http://112.124.38.227:52417',
        timeout: 5000
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                if(error) return reject(error);
                if(body) return reject(body);
                if(res) return reject(res);
                return reject('Can not catch any error of function getPromiseReq');
            }
        });
    });
};

//post方法
exports.postPromiseReq = function (url, formParam) {
    return new Promise((resolve, reject) => {
        request.post(url, {
            forever: true,
            // proxy: 'http://112.124.38.227:52417',
            form: formParam
        }, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                if(error) return reject(error);
                if(body) return reject(body);
                if(res) return reject(res);
                return reject('Can not catch any error of function postPromiseReq');
            }
        });
    });
};

exports.generateHttpUrl = function (url, param) {
    url = (url +'?');
    if (param !== undefined) {
        let keyArr = Object.keys(param).sort();
        for (let i = 0; i < keyArr.length; i++) {
            url += keyArr[i] + '=' + param[keyArr[i]] + '&';
        }
    }
    return url.substr(0, url.length - 1);
};

exports.buildParam = function (param, secretKey) {
    let keyArr = Object.keys(param).sort();
    let sign = '';

    for (let i = 0; i < keyArr.length; i++) {
        sign += keyArr[i] + '=' + param[keyArr[i]] + '&';
    }

    sign = sign + 'secret_key=' + secretKey;

    let md5 = crypto.createHash('md5');
    md5.update(sign);

    param['sign'] = md5.digest('hex').toLocaleUpperCase();  //MD5值

    return param;
};