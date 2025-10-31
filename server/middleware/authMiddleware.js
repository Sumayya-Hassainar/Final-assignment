const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Accept "Bearer <token>" or raw token in Authorization header
    const header = req.header('Authorization') || req.header('authorization');
    if (!header) return res.status(401).json({ message: 'No token provided, authorization denied' });

    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;
    if (!token) return res.status(401).json({ message: 'Token malformed or missing' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'JWT secret not configured' });

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
