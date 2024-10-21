const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'Testing123', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });
    req.user = user; // Attach user information to the request
    next(); // Call the next middleware
  });
};

module.exports = authenticate;
