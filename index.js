
const constant = require('./constant/define');
const error = require('./error/define');

const future = require('./future/define');
const spot = require('./spot/define');
const http = require('./http/define');
const time = require('./time/define');

let config;



module.exports = {
    constant, error,
    future, spot, http, time
};