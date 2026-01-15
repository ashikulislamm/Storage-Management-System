import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';
import config from '../../config/index.js';

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire
  });
};

/**
 * Register new user
 */
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email }).select('+password');
  if (existingUser && !existingUser.isDeleted) {
    throw new Error('User already exists with this email');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  // Generate token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    token
  };
};

/**
 * Login user
 */
const loginUser = async (credentials) => {
  const { email, password } = credentials;

  // Find user with password field
  const user = await User.findOne({ email }).select('+password');

  if (!user || user.isDeleted) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    token
  };
};

export {
  registerUser,
  loginUser
};