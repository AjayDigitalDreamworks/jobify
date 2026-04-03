const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

const getAccessSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return process.env.JWT_SECRET;
};

const getRefreshSecret = () => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

  if (!refreshSecret) {
    throw new Error('JWT refresh secret is not configured');
  }

  return refreshSecret;
};

const buildTokenPayload = (user) => ({
  userId: user._id.toString(),
  role: user.role,
});

const generateAccessToken = (user) =>
  jwt.sign(buildTokenPayload(user), getAccessSecret(), { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

const generateRefreshToken = (user) =>
  jwt.sign(buildTokenPayload(user), getRefreshSecret(), { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

const verifyAccessToken = (token) => jwt.verify(token, getAccessSecret());

const verifyRefreshToken = (token) => jwt.verify(token, getRefreshSecret());

module.exports = {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
