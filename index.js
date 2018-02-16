
const constant = require('./constant/define');
const MarketFutureAPI = require('./marketFutureAPI/marketFutureAPI');

let defaultConfig = {
    okex: {
        base_url: 'https://www.okex.com',
        retry_time: 3,

        api_key: '',
        secret_key: ''
    }
};

let config;

function configure(userConfig) {

    if (userConfig) {

        if(userConfig.okex){
            Object.assign(defaultConfig.okex, userConfig.okex);
        }

        if(userConfig.hbpro){
            Object.assign(defaultConfig.hbpro, userConfig.hbpro);
        }
    }

    config = defaultConfig;

}

function marketFuture() {
    if (config === undefined)
        configure();

    return new MarketFutureAPI(config);
}

const ghostexchange = {
    configure,
    marketFuture,
    constant,
};

module.exports = ghostexchange;