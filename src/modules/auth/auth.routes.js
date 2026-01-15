import express from 'express';
import { signup, login, logout } from './auth.controller.js';
import { signupValidation, loginValidation } from './auth.validation.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// Protected routes
router.post('/logout', protect, logout);

export default router;