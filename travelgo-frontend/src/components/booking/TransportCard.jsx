import React from 'react';
import { Plane, Bus, TrainFront, Building, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

export default function TransportCard({ item, type, onBook }) {
  
  // Dynamically select the correct icon based on the search type
  const getIcon = () => {
    switch (type) {
      case 'flight': return <Plane className="h-6 w-6 text-slate-700" />;
      case 'train': return <TrainFront className="h-6 w-6 text-slate-700" />;
      case 'bus': return <Bus className="h-6 w-6 text-slate-700" />;
      case 'hotel': return <Building className="h-6 w-6 text-slate-700" />;
      default: return <Plane className="h-6 w-6 text-slate-700" />;
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-shadow"
    >
      
      {/* Left Section: Icon & Basic Details */}
      <div className="flex-1 w-full md:w-auto mb-6 md:mb-0">
        <div className="flex items-center space-x-4 mb-3">
          <div className="bg-slate-100 p-3 rounded-xl">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            
            {/* Conditional Rendering: Hotel details vs Transport details */}
            {type === 'hotel' ? (
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-700">{item.rating}</span>
                <span>•</span>
                <span>{item.type}</span>
                <span>•</span>
                <span>{item.source}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mt-1 font-medium">
                {item.time} • <span className="text-slate-400">{item.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Route Details (Only show if it is not a hotel) */}
        {type !== 'hotel' && (
          <div className="flex items-center space-x-4 text-sm font-bold text-gray-700 pl-16">
            <span>{item.source}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span>{item.dest}</span>
          </div>
        )}
      </div>

      {/* Right Section: Price & Action */}
      <div className="flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-gray-100 w-full md:w-auto pt-4 md:pt-0 md:pl-8">
        <span className="text-2xl font-black text-gray-900 mb-1">
          ₹{item.price}
        </span>
        <span className="text-xs text-gray-500 font-medium mb-4 uppercase tracking-wider">
          {type === 'hotel' ? 'per night' : 'per person'}
        </span>
        
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => onBook(item)}
          className="w-full md:w-auto shadow-md"
        >
          Book Now
        </Button>
      </div>

    </motion.div>
  );
}