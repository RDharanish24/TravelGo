import React from 'react';
import { motion } from 'framer-motion';

export default function SeatMap({ type, selectedSeats, onToggleSeat }) {
  
  // Dynamic Grid Generator based on transport type
  const getLayout = () => {
    switch (type) {
      case 'bus':
        return { rows: 10, cols: 4, aisle: 2 }; // 2 seats, aisle, 2 seats
      case 'flight':
        return { rows: 20, cols: 6, aisle: 3 }; // 3 seats, aisle, 3 seats
      case 'train':
      default:
        return { rows: 12, cols: 3, aisle: 1 }; // 1 seat, aisle, 2 seats
    }
  };

  const layout = getLayout();

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Scrollable Container for the Map */}
      <div className="inline-block p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner overflow-x-auto no-scrollbar max-w-full">
        
        {/* Front of vehicle indicator */}
        <div className="w-full h-10 border-t-4 border-slate-300 rounded-t-[50%] mb-10 flex items-center justify-center relative">
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-4">
            Front
          </span>
        </div>
        
        {/* Seat Grid */}
        <div className="flex flex-col space-y-4">
          {Array.from({ length: layout.rows }).map((_, rIdx) => (
            <div key={`row-${rIdx}`} className="flex justify-center space-x-3">
              
              {Array.from({ length: layout.cols }).map((_, cIdx) => {
                // Generate a seat ID like "A1", "B1", "C2", etc.
                const seatId = `${String.fromCharCode(65 + cIdx)}${rIdx + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                const isAisle = cIdx === layout.aisle;
                
                return (
                  <React.Fragment key={seatId}>
                    {/* Render the Aisle Gap */}
                    {isAisle && <div className="w-8" />} 
                    
                    {/* Render the Seat Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onToggleSeat(seatId)}
                      className={`w-12 h-12 rounded-xl text-sm font-semibold transition-colors border-b-4 flex items-center justify-center ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-800 text-white shadow-md' 
                          : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-100'
                      }`}
                      aria-label={`Seat ${seatId}`}
                      aria-pressed={isSelected}
                    >
                      {seatId}
                    </motion.button>
                  </React.Fragment>
                );
              })}
              
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="mt-8 flex justify-center space-x-8 text-sm font-medium text-gray-600 bg-slate-50 py-4 px-6 rounded-xl border border-slate-100">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-md bg-white border border-slate-300 mr-3 shadow-sm"></div> 
          Available
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-md bg-blue-600 border-b-2 border-blue-800 mr-3 shadow-sm"></div> 
          Selected
        </div>
      </div>

    </div>
  );
}