import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  addPaymentMethod
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.put('/password', authenticate, updatePassword);
router.post('/payment-method', authenticate, addPaymentMethod);

export default router;
