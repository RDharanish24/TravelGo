import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  icon: Icon,
  ...props 
}) {
  
  // Base styles applied to all buttons
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  // Style variations
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg shadow-blue-600/30",
    secondary: "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 focus:ring-blue-500 bg-transparent",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500 border border-red-200",
    ghost: "text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent"
  };

  // Size variations
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* If an icon is passed, render it with proper spacing */}
      {Icon && <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
      {children}
    </motion.button>
  );
}