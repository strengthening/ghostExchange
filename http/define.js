const qs = require('querystring');
const request = require('request');

const E = require('../error/define');

function get(url, param) {

    return new Promise(function (resolve, reject) {

        const headers = {
            'User-Agent': 'request',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        let options = {
            url: url+'?'+qs.stringify(param),
            headers: headers,
            forever: true,
            // proxy: 'http://112.124.38.227:52417',
            timeout: 5000
        };

        request(options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                if (error) return reject(error);
                if (body) return reject(body);
                if (res) return reject(res);
                return reject(E.HTTP_NO_REASON);
            }
        });
    });

}

function post(url, param) {

    return new Promise((resolve, reject) => {

        request.post(url, {
            forever: true,
            // proxy: 'http://112.124.38.227:52417',
            form: param
        }, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                if (error) return reject(error);
                if (body) return reject(body);
                if (res) return reject(res);
                return reject(E.HTTP_NO_REASON);
            }
        });

    });
}

module.exports = {get, post};