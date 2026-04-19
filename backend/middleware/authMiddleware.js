import jwt from 'jsonwebtoken';

// GATE 1: Verify if the user is logged in at all
export const authMiddleware = (req, res, next) => {
  // Look for token in the 'Authorization' header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user data to the request object so we can use it in controllers
    req.user = decoded; 
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Your session has expired. Please login again." });
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

// GATE 2: Verify if the user has the right role 
export const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({ 
        message: `User is not allowed to access this resource` 
      });
    }
    next();
  };
};