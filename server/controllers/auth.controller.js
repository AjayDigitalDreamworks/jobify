const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/generateToken');

const ALLOWED_ROLES = ['jobSeeker', 'recruiter'];
const REFRESH_TOKEN_SALT_ROUNDS = 10;

const sanitizeEmail = (email = '') => email.trim().toLowerCase();

//login/register ke baad ye return hota hai, jisme user info ke sath access aur refresh token bhi hota hai
const buildAuthResponse = (user) => ({
  user: user.toSafeObject(),
  accessToken: generateAccessToken(user),
  refreshToken: generateRefreshToken(user),
});

const saveUserRefreshToken = async (userId, refreshToken) => {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, REFRESH_TOKEN_SALT_ROUNDS);
  await User.findByIdAndUpdate(userId, { refreshToken: hashedRefreshToken });
};

// Registration ke liye payload validation, jisme basic checks hote hain
const validateRegisterPayload = ({ name, email, password, role }) => {
  if (!name || !email || !password) { // name, email, aur password required 
    return 'Name, email, and password are required';
  }

  if (password.length < 8) { // password should be at least 8 characters long
    return 'Password must be at least 8 characters long';
  }

  if (role && !ALLOWED_ROLES.includes(role)) { // if role is provided, it must be either 'jobSeeker' or 'recruiter'
    return 'Invalid role provided';
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) { //email format check
    return 'Invalid email address';
  }

  return null;
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const validationError = validateRegisterPayload({ name, email, password, role });

    if (validationError) { //if there is any validation error, return 400 with the error message
      return res.status(400).json({ message: validationError });
    }

    // Normalize email to ensure uniqueness and prevent duplicates due to case sensitivity or whitespace
    const normalizedEmail = sanitizeEmail(email); //test@GMAIL.com → test@gmail.com
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    });

    const response = buildAuthResponse(user); //response me user info ke sath access aur refresh token bhi hota hai
    await saveUserRefreshToken(user._id, response.refreshToken); //refresh token ko securely store karne ke liye usko hash karke database me save karte hain

    return res.status(201).json({
      message: 'User registered successfully',
      ...response,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = sanitizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail }).select('+password'); //login ke time password bhi select karna padta hai, kyunki by default password field ko select nahi kiya jata hai for security reasons

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const response = buildAuthResponse(user);
    await saveUserRefreshToken(user._id, response.refreshToken);

    return res.status(200).json({
      message: 'Login successful',
      ...response,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    //refresh token ko verify karte hain, agar valid hai to usme se userId nikalte hain, agar invalid hai to error throw hota hai
    const decoded = verifyRefreshToken(refreshToken); 
    const user = await User.findById(decoded.userId).select('+refreshToken');

    if (!user || !user.refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      message: 'Access token refreshed successfully',
      accessToken,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token expired' });
    }

    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
    }

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(200).json({ message: 'Logout successful' });
  }
};

const getUser = async (req, res) => res.status(200).json({ user: req.user });

const home = async (req, res) => res.status(200).json({ message: 'Auth service is running' });

module.exports = {
  getUser,
  home,
  login,
  logout,
  refresh,
  register,
};
