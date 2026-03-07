import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';

export default function Toast() {
  // Pulling the toast state from the BookingContext
  const { toast } = useBooking();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="fixed bottom-5 right-5 z-50"
        >
          <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'
          }`}>
            {toast.type === 'error' ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}