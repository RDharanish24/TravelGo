import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Common Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import SearchResults from './pages/SearchResults';
import FlightResults from './pages/FlightResults';
import TrainResults from './pages/TrainResults';
import BusResults from './pages/BusResults';
import HotelResults from './pages/HotelResults';
import BookingSummary from './pages/BookingSummary';
import BookingFlow from './pages/BookingFlow';
import Dashboard from './pages/Dashboard';

/**
 * AnimatedRoutes Component
 * We wrap our Routes in a separate component so we can access 
 * the 'useLocation' hook, which is required for Framer Motion 
 * to track which page is exitng and which is entering.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />

        {/* Booking Process */}
        <Route path="/results" element={<SearchResults />} />
        <Route path="/results/flight" element={<FlightResults />} />
        <Route path="/results/train" element={<TrainResults />} />
        <Route path="/results/bus" element={<BusResults />} />
        <Route path="/results/hotel" element={<HotelResults />} />
        <Route path="/booking-summary" element={<BookingSummary />} />

        {/* The '/*' allows BookingFlow to handle its own internal 
          sub-routes like /book/seats and /book/payment 
        */}
        <Route path="/book/*" element={<BookingFlow />} />

        {/* User Profile */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      {/* The flex-col and min-h-screen classes ensure the Footer 
        stays at the bottom even on pages with little content.
      */}
      <div className="min-h-screen font-sans text-gray-900 bg-slate-50 flex flex-col">
        {/* Persistent UI Elements */}
        <Navbar />
        <Toast />

        {/* Main Content Area */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}