'use strict';

const C = require('../constant/define');

function parse(dateStr, format) {
    let timestamp = -1;
    if (format === C.DATE_SHORT_FORMAT) {

        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(4, 2));
        let day = parseInt(dateStr.substr(6, 2));
        timestamp = new Date(year, month - 1, day).getTime();

    } else if (format === C.DATETIME_SHORT_FORMAT) {

        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(4, 2));
        let day = parseInt(dateStr.substr(6, 2));
        let hour = parseInt(dateStr.substr(8, 2));
        let min = parseInt(dateStr.substr(10, 2));
        let sec = parseInt(dateStr.substr(12, 2));
        timestamp = new Date(year, month - 1, day, hour, min, sec).getTime();

    } else if (format === C.DATE_STANDARD_FORMAT) {

        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(5, 2));
        let day = parseInt(dateStr.substr(8, 2));
        timestamp = new Date(year, month - 1, day).getTime();

    } else if (format === C.DATETIME_STANDARD_FORMAT) {

        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(5, 2));
        let day = parseInt(dateStr.substr(8, 2));
        let hour = parseInt(dateStr.substr(11, 2));
        let min = parseInt(dateStr.substr(14, 2));
        let sec = parseInt(dateStr.substr(17, 2));
        timestamp = new Date(year, month - 1, day, hour, min, sec).getTime();

    } else {
        throw 'Can not recognize the format: ' + format;
    }

    return timestamp;
}

function string(timestamp, format) {
    let dateStr = '';
    let date = new Date(timestamp);

    let year = date.getFullYear() + '';
    let month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : ((date.getMonth() + 1) + '');
    let day = date.getDate() < 9 ? ('0' + date.getDate()) : (date.getDate() + '');

    if (format === C.DATE_SHORT_FORMAT || format === C.DATE_STANDARD_FORMAT) {

        dateStr = format === C.DATE_SHORT_FORMAT ? year + month + day : year + '-' + month + '-' + day;

    } else if (format === C.DATETIME_SHORT_FORMAT || format === C.DATETIME_STANDARD_FORMAT) {

        let hour = date.getHours() < 9 ? ('0' + date.getHours()) : (date.getHours() + '');
        let min = date.getMinutes() < 9 ? ('0' + date.getMinutes()) : (date.getMinutes() + '');
        let sec = date.getSeconds() < 9 ? ('0' + date.getSeconds()) : (date.getSeconds() + '');
        if (format === C.DATETIME_SHORT_FORMAT) {
            dateStr = year + month + day + hour + min + sec;
        } else {
            dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        }

    } else {
        throw 'Can not recognize the format: ' + format;
    }
    return dateStr;
}

function month(timestamp) {
    if (timestamp === undefined)
        timestamp = new Date().getTime();
    let date = new Date(timestamp);

    return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
}

function day(timestamp) {
    if (timestamp === undefined)
        timestamp = new Date().getTime();

    let tmpTS = new Date(1970, 9, 28).getTime();
    let days = parseInt((timestamp - tmpTS) / (24 * 60 * 60 * 1000));

    return tmpTS + days * 24 * 60 * 60 * 1000;

}

function hour(timestamp) {
    if (timestamp === undefined)
        timestamp = new Date().getTime();
    return parseInt(timestamp / 60000 / 60) * 60000 * 60;
}

function minute(timestamp) {
    if (timestamp === undefined)
        timestamp = new Date().getTime();
    return parseInt(timestamp / 60000) * 60000;
}

function setTimeout(delay) {
    return new Promise((resolve) => {
        if (delay === undefined || delay < 0)
            delay = 0;

        setTimeout(function () {
            resolve();
        }, delay);
    });
}

exports.timestamp = {
    parse, month, day, hour, minute, string
};

exports.util = {
    setTimeout
};