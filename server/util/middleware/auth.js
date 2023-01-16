const jwt = require('jsonwebtoken')
const Validation = require('../validation.js');
const UnauthenticatedError = require('../errors/unathenticated');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, nome, email } = decoded;
        req.usuario = { id, nome, email };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware