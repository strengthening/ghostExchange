exports.SYMBOL_BTC_USD = 'btc_usd';
exports.SYMBOL_ETH_USD = 'eth_usd';
exports.SYMBOL_LTC_USD = 'ltc_usd';
exports.SYMBOL_BCH_USD = 'bch_usd';
exports.SYMBOL_ETC_USD = 'etc_usd';

exports.EXCHANGE_HUOBI = 'hb';
exports.EXCHANGE_OKEX = 'okex';

exports.ORDER_STATUS_WAIT = 'wait';   //  等待成交订单
exports.ORDER_STATUS_OPEN = 'open';   //  已开仓订单
exports.ORDER_STATUS_IN = 'in';
exports.ORDER_STATUS_WIN = 'win';
exports.ORDER_STATUS_LOSE = 'lose';
exports.ORDER_STATUS_ERROR = 'error';   //  错误入场订单
exports.ORDER_STATUS_CANCEL = 'cancel';   //  取消入场订单
exports.ORDER_STATUS_TOP = 'top';   //  上行通道订单
exports.ORDER_STATUS_BOTTOM = 'bottom';   //  下行通道订单
exports.ORDER_STATUS_OUT = 'out';
exports.ORDER_STATUS_LIQUIDATE = 'liquidate';   //  已平仓订单
exports.ORDER_STATUS_LOCK = 'lock';
exports.ORDER_STATUS_DELETE = 'delete';

exports.ORDER_DIRECTION_LEFT = 'left';
exports.ORDER_DIRECTION_RIGHT = 'right';

exports.INTERVAL_LEVEL_NORMAL = 5000;
exports.INTERVAL_LEVEL_FAST = 3000;
exports.INTERVAL_LEVEL_FASTER = 1000;
exports.INTERVAL_LEVEL_FASTEST = 300;

exports.CUMSUM_LEVEL_NORMAL = 30000;
exports.CUMSUM_LEVEL_FAST = 20000;
exports.CUMSUM_LEVEL_FASTER = 10000;
exports.CUMSUM_LEVEL_FASTEST = 3500;

exports.CONTRACT_TYPE_OKEX_THIS_WEEK = 'this_week';
exports.CONTRACT_TYPE_OKEX_NEXT_WEEK = 'next_week';
exports.CONTRACT_TYPE_OKEX_QUARTER = 'quarter';

exports.LEVER_RATE_OKEX_LEVEL1 = 10;
exports.LEVER_RATE_OKEX_LEVEL2 = 20;

exports.OPEN_LONG_OKEX = 1;
exports.OPEN_SHORT_OKEX = 2;
exports.LIQUIDATE_LONG_OKEX = 3;
exports.LIQUIDATE_SHORT_OKEX = 4;

exports.DATE_STANDARD_FORMAT = '2017-03-10';
exports.DATE_SHORT_FORMAT = '20170310';

exports.DATETIME_SHORT_FORMAT = '20170310000000';
exports.DATETIME_STANDARD_FORMAT = '2017-03-10 00:00:00';

exports.KLINE_TYPE_DAY_KLINE = '1day';
exports.KLINE_TYPE_MIN_KLINE = '1min';
