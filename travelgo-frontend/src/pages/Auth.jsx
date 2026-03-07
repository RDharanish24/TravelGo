import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

// Importing from our separated, dedicated contexts
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

export default function Auth({ type }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useBooking();
  
  // Local form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type === 'login') {
      // Mock login logic
      const userName = formData.email.split('@')[0];
      login({ name: userName, email: formData.email });
      showToast(`Welcome back, ${userName}!`);
    } else {
      // Mock register logic
      login({ name: formData.name || formData.email.split('@')[0], email: formData.email });
      showToast('Registration successful! Welcome to TravelGo.');
    }
    
    // Redirect to dashboard after successful auth
    navigate('/dashboard');
  };

  // Framer motion variants for smooth staggered form loading
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      exit="exit"
      className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        variants={containerVariants}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
      >
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

        <motion.div variants={itemVariants}>
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Plane className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Only show Name field on Registration */}
            {type === 'register' && (
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm transition-all" 
                  placeholder="John Doe" 
                />
              </motion.div>
            )}
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                name="email" 
                type="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm transition-all" 
                placeholder="you@example.com" 
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm transition-all" 
                placeholder="••••••••" 
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
            >
              {type === 'login' ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="text-center text-sm text-gray-600">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={type === 'login' ? '/register' : '/login'} 
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}