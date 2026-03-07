import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['bus', 'flight', 'train', 'car'],
      required: true
    },
    operator: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    departureTime: {
      type: Date,
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    duration: String,
    stops: [String],
    seating: {
      totalSeats: {
        type: Number,
        required: true
      },
      availableSeats: {
        type: Number,
        required: true
      },
      seatLayout: {
        rows: Number,
        columns: Number
      },
      seatMap: [{
        seatNumber: String,
        isAvailable: { type: Boolean, default: true },
        price: Number
      }]
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true
      },
      priceVariation: {
        peakHours: Number,
        offPeakHours: Number
      },
      taxes: Number,
      discount: { type: Number, default: 0 }
    },
    amenities: [String], // wifi, food, ac, etc
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5
    },
    reviews: [String],
    image: String,
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model('Transport', transportSchema);
