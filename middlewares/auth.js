const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function isAuth(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ no: 'Por favor inicie sesión' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, config.secrets.jwt);
        if (payload.exp < moment().unix()) {
            return res.status(401).json({ no: 'Token expiró' });
        }
        req.userName = payload.sub;
        next();
    } catch (e) {
        return res.status(401).json({ no: 'Token expiró' });
    }
}
module.exports = isAuth;