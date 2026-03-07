import express from 'express';
import {
  createBooking,
  getBooking,
  getUserBookings,
  updateBooking,
  cancelBooking
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/', authenticate, createBooking);
router.get('/user', authenticate, getUserBookings);
router.get('/:bookingId', authenticate, getBooking);
router.put('/:bookingId', authenticate, updateBooking);
router.delete('/:bookingId', authenticate, cancelBooking);

export default router;
