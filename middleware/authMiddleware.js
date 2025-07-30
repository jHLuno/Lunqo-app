const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error('❌ JWT_SECRET environment variable is required');
  process.exit(1);
}

// Generic token verification function
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Extract token from authorization header
function extractToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  return token;
}

// Brand authentication middleware
function authBrand(req, res, next) {
  try {
    const token = extractToken(req);
    const decoded = verifyToken(token);
    
    req.brandId = decoded.brandId;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: error.message === 'No token provided' ? 'No token provided' : 'Invalid token' 
    });
  }
}

// Admin authentication middleware
function authAdmin(req, res, next) {
  try {
    const token = extractToken(req);
    const decoded = verifyToken(token);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ 
      message: error.message === 'No token provided' ? 'No token provided' : 'Invalid token' 
    });
  }
}

module.exports = { authBrand, authAdmin };
