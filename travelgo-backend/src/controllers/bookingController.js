import Booking from '../models/Booking.js';
import Transport from '../models/Transport.js';
import User from '../models/User.js';
import { generateBookingReference, validateBookingData } from '../utils/validators.js';

export const createBooking = async (req, res) => {
  try {
    const { transportId, journeyDetails, seats, specialRequests } = req.body;
    const userId = req.userId;

    // Validate booking data
    const validation = validateBookingData(journeyDetails);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Fetch transport details
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    // Calculate pricing
    const basePrice = transport.pricing.basePrice * journeyDetails.passengers;
    const taxes = basePrice * 0.1; // 10% tax
    const totalPrice = basePrice + taxes - (transport.pricing.discount || 0);

    // Create booking
    const booking = new Booking({
      userId,
      transportId,
      bookingReference: generateBookingReference(),
      journeyDetails,
      seats,
      pricing: {
        basePrice,
        taxes,
        discount: transport.pricing.discount || 0,
        totalPrice
      },
      specialRequests
    });

    await booking.save();

    // Update user bookings
    await User.findByIdAndUpdate(userId, {
      $push: { bookings: booking._id }
    });

    // Update available seats
    const newAvailableSeats = transport.seating.availableSeats - journeyDetails.passengers;
    await Transport.findByIdAndUpdate(transportId, {
      'seating.availableSeats': newAvailableSeats
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('transportId')
      .populate('userId', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ userId })
      .populate('transportId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: 'cancelled',
        paymentStatus: 'refunded',
        cancellationReason: reason,
        cancelledAt: new Date()
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Restore available seats
    const transport = await Transport.findById(booking.transportId);
    const restoredSeats = transport.seating.availableSeats + booking.journeyDetails.passengers;
    await Transport.findByIdAndUpdate(booking.transportId, {
      'seating.availableSeats': restoredSeats
    });

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
