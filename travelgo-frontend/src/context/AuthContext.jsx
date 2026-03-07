import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with a function to check localStorage first
  // This prevents the user from being logged out on a page refresh
  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const savedUser = localStorage.getItem('travelgo_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from local storage", error);
      return null;
    }
  });

  // A wrapper around setCurrentUser to ensure localStorage stays in sync
  const setCurrentUser = (userData) => {
    setCurrentUserState(userData);
    if (userData) {
      localStorage.setItem('travelgo_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('travelgo_user');
    }
  };

  // Dedicated login function for clean API calls later
  const login = (userData) => {
    setCurrentUser(userData);
  };

  // Dedicated logout function to clear state and storage
  const logout = () => {
    setCurrentUser(null);
  };

  // Bundle the state and actions
  const value = {
    currentUser,
    setCurrentUser, // Exported so Auth.jsx can use it
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with built-in error handling
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};