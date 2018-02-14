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
        config = userConfig;
    }

    config = defaultConfig;
}

function marketFuture() {
    if (config === undefined)
        configure();

    return
}

const ghostexchange = {
    configure,
    marketFuture,
};

module.exports = ghostexchange;