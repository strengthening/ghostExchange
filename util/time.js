exports.getThisMinTS = function (timestamp) {
    if (timestamp === undefined) {
        timestamp = new Date().getTime();
    }
    return (parseInt(timestamp / 60000)) * 60000;
};

exports.getNextMinTS = function () {
    let now_ts = new Date().getTime();
    return (parseInt(now_ts / 60000) + 1) * 60000;
};

exports.getNextDayTS = function () {
    let now_ts = new Date().getTime();
    return (parseInt((now_ts - 929548800000) / 24 / 60 / 60 / 1000) + 1) * 24 * 60 * 60 * 1000 + 929548800000;
};

exports.getTodayTS = function () {
    let now_ts = new Date().getTime();
    return (parseInt((now_ts - 929548800000) / 24 / 60 / 60 / 1000)) * 24 * 60 * 60 * 1000 + 929548800000;
};

exports.getTomorrowTS = function () {
    return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
    ).getTime();
};

exports.getYesterdayTS = function () {
    return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
    ).getTime();
};


exports.getNextHourTS = function () {
    let now_ts = new Date().getTime();
    return (parseInt(now_ts / 60000 / 60) + 1) * 60000 * 60;
};

exports.setTimeout = function (delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0)
            reject('setTimeoutErr');
        setTimeout(function () {
            resolve();
        }, delay);
    });
};
