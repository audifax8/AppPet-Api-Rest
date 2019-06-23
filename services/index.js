const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }
    return jwt.encode(payload, config.secrets.jwt);
}

module.exports = createToken;