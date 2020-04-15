const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config.js');
const log = require('../log');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = jwt.verify(token, config.jwt.key, (err, decoded) => {
            if(err)
                throw new Error();
            return decoded;
        });
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        log.debug("Not authorized to access this resource");
        res.status(400).json({ error: 'Not authorized to access this resource' });
    }

}
module.exports = auth;