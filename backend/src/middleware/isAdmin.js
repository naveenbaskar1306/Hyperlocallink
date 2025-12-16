// backend/src/middleware/isAdmin.js
const jwt = require('jsonwebtoken');

module.exports = function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || process.env.JWT_SECRET_ADMIN);
    if (!payload || !payload.role || payload.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
