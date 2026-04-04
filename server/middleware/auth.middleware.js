const User = require('../models/user.model');
const { verifyAccessToken } = require('../utils/generateToken');

const authMiddleware = async (req, res, next) => {
  try {
    //Authorization: Bearer eyJhbGciOiJIUzI1Ni...  ye pura string authHeader mei ata hai 
    const authHeader = req.headers.authorization || ''; 

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1]; //split → ["Bearer", "TOKEN"] and index 1 = actual JWT
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found for this token' });
    }

    req.token = token;
    req.user = user.toSafeObject();
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired' });
    }

    return res.status(401).json({ message: 'Invalid access token' });
  }
};

module.exports = authMiddleware;
