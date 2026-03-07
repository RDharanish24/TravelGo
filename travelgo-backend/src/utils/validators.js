export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateBookingData = (data) => {
  const errors = [];
  
  if (!data.from) errors.push('From location is required');
  if (!data.to) errors.push('To location is required');
  if (!data.departureDate) errors.push('Departure date is required');
  if (!data.passengers || data.passengers < 1) errors.push('Number of passengers is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateBookingReference = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TG${timestamp}${random}`;
};
