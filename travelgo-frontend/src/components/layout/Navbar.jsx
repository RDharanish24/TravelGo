import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  // Pulling only the user data and logout function from our dedicated AuthContext
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Send them back to the home page after logging out
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center cursor-pointer group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-blue-600 p-2 rounded-xl transition-all shadow-md group-hover:shadow-blue-500/50"
            >
              <Plane className="h-6 w-6 text-white" />
            </motion.div>
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              TravelGo
            </span>
          </Link>
          
          {/* Navigation Links & Auth */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              // --- LOGGED IN STATE ---
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  My Trips
                </Link>
                
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">{currentUser.name}</span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout} 
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </>
            ) : (
              // --- LOGGED OUT STATE ---
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Log in
                </Link>
                
                <Link to="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:shadow-blue-600/30"
                  >
                    Sign up
                  </motion.button>
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>
    </motion.nav>
  );
}