exports.getStdPromise = function (promise) {
    return new Promise((resolve) => {
        promise.then(result => {
            resolve([result, undefined]);
        }, err => {
            resolve([undefined, err]);
        });
    });
};