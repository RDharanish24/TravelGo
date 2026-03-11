# TravelGO - Your Ultimate Travel Companion

A full-stack travel booking application that simplifies searching, comparing, and booking transportation options for seamless travel experiences.

## 🌟 Features

- **Smart Search**: Search for transportation options by origin, destination, and date
- **Multiple Transport Options**: Browse buses, trains, flights, and other transport modes
- **Easy Booking**: Intuitive seat selection and booking flow
- **User Authentication**: Secure login and registration system
- **Booking Management**: View and manage your bookings from your dashboard
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Real-time Search**: Fast and accurate search results with instant updates

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
TravelGO/
├── travelgo-backend/              # Express.js backend server
│   ├── src/
│   │   ├── server.js              # Main server entry point
│   │   ├── config/
│   │   │   └── database.js        # MongoDB configuration
│   │   ├── controllers/           # Business logic
│   │   │   ├── authController.js
│   │   │   ├── bookingController.js
│   │   │   ├── searchController.js
│   │   │   └── userController.js
│   │   ├── models/                # Database schemas
│   │   │   ├── User.js
│   │   │   ├── Booking.js
│   │   │   └── Transport.js
│   │   ├── routes/                # API endpoints
│   │   │   ├── auth.js
│   │   │   ├── bookings.js
│   │   │   ├── search.js
│   │   │   └── users.js
│   │   ├── middleware/            # Express middleware
│   │   │   └── auth.js
│   │   └── utils/
│   │       ├── errorHandler.js
│   │       └── validators.js
│   ├── .env                       # Environment variables (local)
│   ├── .env.example               # Example environment variables
│   ├── package.json
│   └── README.md
│
├── travelgo-frontend/             # React frontend application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx               # Entry point
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   ├── BusResults.jsx
│   │   │   ├── FlightResults.jsx
│   │   │   ├── HotelResults.jsx
│   │   │   ├── TrainResults.jsx
│   │   │   ├── BookingFlow.jsx
│   │   │   ├── BookingSummary.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/            # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── booking/
│   │   │       ├── SearchBar.jsx
│   │   │       ├── TransportCard.jsx
│   │   │       └── SeatMap.jsx
│   │   ├── context/               # Context API providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── BookingContext.jsx
│   │   ├── utils/
│   │   │   └── mockData.js
│   │   └── assets/
│   │       └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
├── package.json                   # Root package.json (if using monorepo)
└── README.md                      # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd travelgo-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travelgo
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd travelgo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Search Endpoints
- `GET /api/search` - Search for transportation options
- `GET /api/search/:id` - Get transport details

### Booking Endpoints
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🏃 Running the Full Application

### Using Multiple Terminals

Terminal 1 - Backend:
```bash
cd travelgo-backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd travelgo-frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Overview

### Home Page
- Hero section with search functionality
- Popular destinations
- Featured transport options

### Search Results
- Filter by price, departure time, duration
- Sort by price, duration, rating
- Transport card details

### Booking Flow
- Step-by-step booking process
- Seat selection map
- Passenger details form
- Payment confirmation

### Dashboard
- View all bookings
- Booking status tracking
- Cancel or modify bookings
- Download e-tickets

### Authentication
- User registration with email validation
- Secure login with JWT
- Password reset functionality
- Profile management

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes with middleware
- CORS configuration
- Input validation and sanitization
- Secure HTTP headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Git Workflow

```bash
# Clone the repository
git clone https://github.com/RDharanish24/TravelGo.git
cd TravelGo

# Create a new branch for features
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add description of your changes"

# Push to remote
git push origin feature/your-feature-name
```

.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced filters (amenities, ratings)
- [ ] Travel insurance options
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Hotel booking integration



**Happy Travels with TravelGO!** ✈️🚌🚂
