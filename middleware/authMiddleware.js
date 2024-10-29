const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the Authorization header
  const token = req.header('Authorization');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  // Remove the "Bearer " part from the token
  const cleanedToken = token.replace('Bearer ', '');

  try {
    // Verify token
    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded token (user info) to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

module.exports = authMiddleware;
