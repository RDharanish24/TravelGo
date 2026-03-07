import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CreditCard, CheckCircle2 } from 'lucide-react';

// Contexts
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

// Components
import SeatMap from '../components/booking/SeatMap';
import Button from '../components/common/Button';

// --- STEP 1: SEAT SELECTION VIEW ---
const SeatSelectionStep = () => {
  const navigate = useNavigate();
  const { searchParams, selectedItem, selectedSeats, setSelectedSeats } = useBooking();

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col lg:flex-row gap-8"
    >
      <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select your {searchParams.type === 'hotel' ? 'Rooms' : 'Seats'}</h2>
        
        {/* We use the reusable SeatMap component we built earlier! */}
        <SeatMap 
          type={searchParams.type} 
          selectedSeats={selectedSeats} 
          onToggleSeat={toggleSeat} 
        />
      </div>

      <div className="w-full lg:w-96">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Trip Summary</h3>
          
          <div className="space-y-4 text-sm text-gray-600 mb-8">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <span>Price per unit</span>
              <span className="font-bold text-gray-900 text-lg">₹{selectedItem.price}</span>
            </div>
            
            <div className="flex justify-between items-start p-2">
              <span>Selected</span>
              <div className="text-right">
                <span className="font-bold text-gray-900">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                <div className="text-xs text-gray-400 mt-1">({selectedSeats.length} total)</div>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-end">
              <span className="font-bold text-gray-900">Total Due</span>
              <span className="text-3xl font-black text-blue-600">₹{selectedItem.price * (selectedSeats.length || 0)}</span>
            </div>
          </div>

          {selectedSeats.length === 0 && (
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-xl mb-6 text-sm font-medium">
              <ShieldAlert className="h-5 w-5" />
              <span>Please select at least one to continue</span>
            </div>
          )}

          <Button 
            variant="primary" 
            size="lg"
            className="w-full"
            disabled={selectedSeats.length === 0}
            onClick={() => navigate('/book/payment')} // Navigate to the nested payment route
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// --- STEP 2: PAYMENT VIEW ---
const PaymentStep = () => {
  const navigate = useNavigate();
  const { selectedItem, selectedSeats, searchParams, confirmBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Create the final booking object
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      item: selectedItem,
      type: searchParams.type,
      date: searchParams.date || new Date().toISOString().split('T')[0],
      seats: selectedSeats,
      totalPrice: selectedItem.price * (selectedSeats.length || 1),
      status: 'Confirmed'
    };
    
    // Send to global context (which also fires the success toast)
    confirmBooking(newBooking);
    
    // Send user to their dashboard
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="bg-blue-900 px-8 py-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-3 h-6 w-6 text-blue-300" />
            Complete Payment
          </h2>
          <p className="text-blue-200 mt-1 text-sm">Secure checkout process via AWS</p>
        </div>
        <div className="text-right">
          <div className="text-blue-200 text-sm">Total Amount</div>
          <div className="text-3xl font-bold">₹{selectedItem.price * (selectedSeats.length || 1)}</div>
        </div>
      </div>
      
      <div className="p-8">
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              {['credit_card', 'upi'].map(method => (
                <div 
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`cursor-pointer border rounded-xl p-4 flex items-center space-x-3 transition-all ${
                    paymentMethod === method ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === method ? 'border-blue-600' : 'border-gray-300'}`}>
                    {paymentMethod === method && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div>
                  <span className="font-semibold text-gray-700 capitalize">{method.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Card Input fields */}
          {paymentMethod === 'credit_card' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number (Mock)</label>
                <input type="text" placeholder="0000 0000 0000 0000" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input type="password" placeholder="123" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                </div>
              </div>
            </motion.div>
          )}

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <button type="button" onClick={() => navigate('/book/seats')} className="text-gray-500 hover:text-blue-600 font-medium">
              Back to Seats
            </button>
            <Button type="submit" variant="primary" size="lg" icon={CheckCircle2}>
              Pay & Confirm
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// --- MAIN WRAPPER COMPONENT ---
export default function BookingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { selectedItem, showToast } = useBooking();

  // Route Protection: Prevent accessing checkout without logging in or selecting an item
  useEffect(() => {
    if (!selectedItem) {
      navigate('/results');
    } else if (!currentUser) {
      showToast('Please log in to continue your booking.', 'error');
      navigate('/login');
    }
  }, [selectedItem, currentUser, navigate, showToast]);

  if (!selectedItem || !currentUser) return null;

  // Determine which step we are on for the progress bar
  const isPaymentStep = location.pathname.includes('/payment');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-8">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`flex items-center space-x-2 ${!isPaymentStep ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${!isPaymentStep ? 'bg-blue-100' : 'bg-gray-200'}`}>1</span>
            <span className="font-semibold">Selection</span>
          </div>
          <div className={`w-16 h-1 rounded-full ${isPaymentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center space-x-2 ${isPaymentStep ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isPaymentStep ? 'bg-blue-100' : 'bg-gray-200'}`}>2</span>
            <span className="font-semibold">Payment</span>
          </div>
        </div>

        {/* Nested Routes for the flow */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="seats" element={<SeatSelectionStep />} />
            <Route path="payment" element={<PaymentStep />} />
          </Routes>
        </AnimatePresence>

      </div>
    </div>
  );
}