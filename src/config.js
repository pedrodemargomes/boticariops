let conf = require('./config.json');

if(process.env.NODE_ENV === undefined)
    conf = conf['development'];
else
    conf = conf[process.env.NODE_ENV];

module.exports = conf;
