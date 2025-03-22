const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Modules/auth/authConfig');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

    try {
        req.user = jwt.verify(token, JWT_SECRET); // Verify and attach decoded user
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;
