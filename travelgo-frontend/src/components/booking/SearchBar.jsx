import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Bus, TrainFront, Building, MapPin, Calendar, Search } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import Button from '../common/Button';

export default function SearchBar() {
  const navigate = useNavigate();
  
  // Pull the global search function and current params from Context
  const { handleSearch, searchParams } = useBooking();
  
  // Local state for the form inputs before they are submitted
  const [localParams, setLocalParams] = useState(
    searchParams || { type: 'flight', source: '', dest: '', date: '' }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    // Update global state and navigate to the results page
    handleSearch(localParams);
    navigate('/results');
  };

  // Define our tabs data array for easy rendering
  const tabs = [
    { id: 'flight', icon: Plane, label: 'Flights' },
    { id: 'train', icon: TrainFront, label: 'Trains' },
    { id: 'bus', icon: Bus, label: 'Buses' },
    { id: 'hotel', icon: Building, label: 'Hotels' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* Tabs Section */}
      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setLocalParams({ ...localParams, type: tab.id })}
            className={`relative flex-1 flex items-center justify-center space-x-2 py-5 px-4 font-semibold transition-colors min-w-[120px] ${
              localParams.type === tab.id 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
            
            {/* Framer Motion Shared Layout Animation for the sliding underline */}
            {localParams.type === tab.id && (
              <motion.div 
                layoutId="activeSearchTab" 
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Search Form Section */}
      <form onSubmit={onSubmit} className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Source Input */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="City or Station" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                value={localParams.source}
                onChange={(e) => setLocalParams({...localParams, source: e.target.value})}
              />
            </div>
          </div>

          {/* Destination Input */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="City or Station" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                value={localParams.dest}
                onChange={(e) => setLocalParams({...localParams, dest: e.target.value})}
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-700"
                value={localParams.date}
                onChange={(e) => setLocalParams({...localParams, date: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            icon={Search}
            className="w-full md:w-auto mx-auto"
          >
            Search {localParams.type.charAt(0).toUpperCase() + localParams.type.slice(1)}s
          </Button>
        </div>
      </form>

    </div>
  );
}