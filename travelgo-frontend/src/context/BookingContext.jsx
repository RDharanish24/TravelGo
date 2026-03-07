import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_DATA } from '../utils/mockData';

// Create the Context
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // --- SEARCH STATE ---
  const [searchParams, setSearchParams] = useState({ type: 'flight', source: '', dest: '', date: '' });
  const [searchResults, setSearchResults] = useState([]);
  
  // --- ACTIVE BOOKING FLOW STATE ---
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // --- USER DASHBOARD STATE (Persisted) ---
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem('travelgo_bookings');
      return savedBookings ? JSON.parse(savedBookings) : [];
    } catch (error) {
      console.error("Failed to load bookings from local storage", error);
      return [];
    }
  });

  // --- UI STATE ---
  const [toast, setToast] = useState(null);

  // --- SIDE EFFECTS ---
  // Whenever bookings change, save them to localStorage
  useEffect(() => {
    localStorage.setItem('travelgo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // --- ACTIONS ---
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    const data = MOCK_DATA[params.type] || [];
    
    // Filter the mock data based on the user's input (case-insensitive)
    const filtered = data.filter(item => {
      const matchSource = params.source ? item.source.toLowerCase().includes(params.source.toLowerCase()) : true;
      const matchDest = params.dest ? item.dest.toLowerCase().includes(params.dest.toLowerCase()) : true;
      return matchSource && matchDest;
    });
    
    // Fallback to showing all data for that category if no exact match is found (useful for demo purposes)
    setSearchResults(filtered.length > 0 ? filtered : data);
  };

  const confirmBooking = (newBooking) => {
    setBookings(prevBookings => [newBooking, ...prevBookings]);
    showToast("Payment successful! Booking confirmed via AWS SNS.", "success");
    clearBookingFlow(); // Reset the active selection
  };

  const cancelBooking = (bookingId) => {
    setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
    showToast("Booking cancelled successfully.", "success");
  };

  const clearBookingFlow = () => {
    setSelectedItem(null);
    setSelectedSeats([]);
  };

  // Bundle everything to provide to the app
  const value = {
    searchParams,
    setSearchParams,
    handleSearch,
    searchResults,
    selectedItem,
    setSelectedItem,
    selectedSeats,
    setSelectedSeats,
    bookings,
    confirmBooking,
    cancelBooking,
    clearBookingFlow,
    toast,
    showToast
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook for easy importing
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};