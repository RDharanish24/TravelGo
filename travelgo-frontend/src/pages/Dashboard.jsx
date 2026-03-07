import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Calendar, User, ChevronRight, MapPin, Trash2 } from 'lucide-react';

// Contexts
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

// Components
import Button from '../components/common/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useBooking();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Header Card */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-10 flex items-center justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name || 'Traveler'}!</h1>
            <p className="text-blue-100">You have {bookings.length} active bookings. Ready for your next adventure?</p>
          </div>
          <div className="hidden md:block relative z-10 opacity-20">
            <Ticket className="h-24 w-24 rotate-12" />
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </motion.div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">My Bookings</h2>
          {bookings.length > 0 && (
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {bookings.length} Total Trips
            </span>
          )}
        </div>

        {/* Bookings List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <motion.div 
                key={booking.id} 
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
              >
                {/* Visual Accent Bar */}
                <div className="w-full md:w-2 bg-blue-600"></div>
                
                <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full tracking-wider uppercase">
                        {booking.status}
                      </span>
                      <span className="text-xs text-gray-400 font-mono font-bold tracking-tighter">ID: {booking.id}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.item.name}</h3>
                    
                    <div className="flex items-center text-gray-600 font-bold mb-3">
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                      {booking.item.source} 
                      <ChevronRight className="inline h-4 w-4 text-gray-300 mx-1" /> 
                      {booking.item.dest}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center bg-slate-50 px-3 py-1 rounded-lg">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {booking.date}
                      </div>
                      <div className="flex items-center bg-slate-50 px-3 py-1 rounded-lg">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {booking.seats.length} {booking.type === 'hotel' ? 'Rooms' : 'Seats'}: {booking.seats.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Amount Paid</div>
                    <div className="text-2xl font-black text-gray-900 mb-4">₹{booking.totalPrice}</div>
                    
                    <Button 
                      variant="danger" 
                      size="sm" 
                      icon={Trash2}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Ticket className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No trips booked yet</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Your upcoming adventures will appear here once you complete a booking.
              </p>
              <Button onClick={() => navigate('/')} variant="primary" size="lg">
                Start Exploring
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Security Footer Note */}
        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg mt-1">
            <Ticket className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900">Important Information</h4>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Cancellations made 24 hours before travel are eligible for a 100% refund. Real-time notifications for these changes are sent to your registered email powered by AWS Simple Notification Service.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}