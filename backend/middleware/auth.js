// middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // More robust way to extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Can include roles, email etc. if encoded
        next();
    } catch (error) {
        console.error('Invalid token:', error.message); // Optional logging
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { verifyToken };
