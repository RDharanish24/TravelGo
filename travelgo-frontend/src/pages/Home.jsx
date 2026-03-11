import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Bus, TrainFront, Building, MapPin, Calendar, Search, ShieldCheck, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Home() {
  const navigate = useNavigate();
  const { handleSearch, searchParams } = useBooking();

  // Local state for the form inputs before they hit the global context
  const [localParams, setLocalParams] = useState(searchParams || {
    type: 'flight',
    source: '',
    dest: '',
    date: '',
    passengers: 1,
    checkIn: '',
    checkOut: '',
    rooms: 1,
    guests: 1,
    budget: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Update global state and navigate to the results page
    handleSearch(localParams);
    navigate(`/results/${localParams.type}`);
  };

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Hero Section */}
      <div className="relative bg-blue-900 pt-16 pb-32 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
            alt="Travel background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Where to next?
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
            Discover incredible destinations and book your entire journey in one place.
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Search Widget */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          {/* Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'flight', icon: Plane, label: 'Flights' },
              { id: 'train', icon: TrainFront, label: 'Trains' },
              { id: 'bus', icon: Bus, label: 'Buses' },
              { id: 'hotel', icon: Building, label: 'Hotels' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLocalParams({ ...localParams, type: tab.id })}
                className={`relative flex-1 flex items-center justify-center space-x-2 py-5 px-4 font-semibold transition-colors min-w-[120px] ${localParams.type === tab.id ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {/* Framer Motion Shared Layout Animation for the underline */}
                {localParams.type === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localParams.type !== 'hotel' ? (
                <>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={localParams.type === 'flight' ? "City or Airport" : localParams.type === 'train' ? "City or Station" : "City or Bus Stand"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.source}
                        onChange={(e) => setLocalParams({ ...localParams, source: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={localParams.type === 'flight' ? "City or Airport" : localParams.type === 'train' ? "City or Station" : "City or Bus Stand"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.dest}
                        onChange={(e) => setLocalParams({ ...localParams, dest: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-700"
                        value={localParams.date}
                        onChange={(e) => setLocalParams({ ...localParams, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative md:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.passengers}
                        onChange={(e) => setLocalParams({ ...localParams, passengers: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative md:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="City or Hotel Name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.dest}
                        onChange={(e) => setLocalParams({ ...localParams, dest: e.target.value, source: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-700"
                        value={localParams.checkIn}
                        onChange={(e) => setLocalParams({ ...localParams, checkIn: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-700"
                        value={localParams.checkOut}
                        onChange={(e) => setLocalParams({ ...localParams, checkOut: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rooms</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.rooms}
                        onChange={(e) => setLocalParams({ ...localParams, rooms: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        value={localParams.guests}
                        onChange={(e) => setLocalParams({ ...localParams, guests: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Approx Budget (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                      <input
                        type="number"
                        placeholder="Max limit"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all transition-all"
                        value={localParams.budget}
                        onChange={(e) => setLocalParams({ ...localParams, budget: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center mx-auto space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search {localParams.type.charAt(0).toUpperCase() + localParams.type.slice(1)}s</span>
              </motion.button>
            </div>
          </form>

        </div>
      </motion.div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why book with TravelGo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Best Price Guarantee', desc: 'We promise the lowest fares across all modes of transport.' },
            { title: 'Instant Refunds', desc: 'Cancel anytime. Get your money back to your source account instantly.' },
            { title: '24/7 Support', desc: 'Our customer support team is always here to help you out.' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}