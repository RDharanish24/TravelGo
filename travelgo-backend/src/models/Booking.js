import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    transportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transport',
      required: true
    },
    bookingReference: {
      type: String,
      unique: true,
      required: true
    },
    journeyDetails: {
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      departureDate: {
        type: Date,
        required: true
      },
      returnDate: Date,
      passengers: {
        type: Number,
        required: true,
        min: 1
      }
    },
    seats: [{
      seatNumber: String,
      passengerName: String,
      passengerEmail: String,
      price: Number
    }],
    pricing: {
      basePrice: Number,
      taxes: Number,
      discount: { type: Number, default: 0 },
      totalPrice: {
        type: Number,
        required: true
      }
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    paymentDetails: {
      method: String,
      transactionId: String,
      paidAt: Date
    },
    cancellationReason: String,
    cancelledAt: Date,
    specialRequests: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
