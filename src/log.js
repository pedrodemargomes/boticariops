const pino = require('pino');
const config = require('./config');
const log = pino({
    level: config.log.level || 'info',
    prettyPrint: true
});

module.exports = log;