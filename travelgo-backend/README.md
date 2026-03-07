# TravelGO Backend

A comprehensive Node.js/Express backend API for the TravelGO travel booking platform.

## Features

- User authentication (signup, login)
- Transport search and filtering
- Booking management
- User profile management
- Seat management
- Payment tracking
- Refund handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travelgo
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Search
- `GET /api/search` - Search transports (query: from, to, date, transportType)
- `GET /api/search/transport/:transportId` - Get transport details
- `GET /api/search/popular-routes` - Get popular routes
- `GET /api/search/filter/price` - Filter by price

### Bookings (Protected)
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/:bookingId` - Get specific booking
- `PUT /api/bookings/:bookingId` - Update booking
- `DELETE /api/bookings/:bookingId` - Cancel booking

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update password
- `POST /api/users/payment-method` - Add payment method

## Project Structure

```
travelgo-backend/
├── src/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md           # This file
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database Schema

### User
- name, email, password (hashed)
- profile (dateOfBirth, gender, address, etc.)
- bookings (array of booking references)
- paymentMethods
- preferences

### Transport
- name, type, operator
- from, to, departureTime, arrivalTime
- seating (totalSeats, availableSeats, seatMap)
- pricing (basePrice, taxes, discount)
- amenities, rating, reviews

### Booking
- userId, transportId
- bookingReference (unique)
- journeyDetails (from, to, dates, passengers)
- seats (with passenger info)
- pricing
- status, paymentStatus

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Development Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire in 7 days (configurable)
- Seat availability is managed in real-time
- Payment details are stored securely
- Email is unique per user

## Future Enhancements

- Email notifications
- Payment gateway integration (Stripe, PayPal)
- Admin dashboard
- Review and rating system
- Cancellation policies
- Seat hold system with expiry
- Dynamic pricing based on demand
