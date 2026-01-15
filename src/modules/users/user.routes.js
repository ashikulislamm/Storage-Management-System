import express from 'express';
import { getProfile, updateProfile, deleteAccount } from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { updateProfileValidation } from './user.validation.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, updateProfile);
router.delete('/profile', deleteAccount);

export default router;