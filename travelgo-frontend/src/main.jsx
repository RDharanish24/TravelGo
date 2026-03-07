import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global Styles (This imports your Tailwind and custom scrollbar logic)
import './assets/index.css';

// Context Providers
// Wrapping the app here makes data available to every single component/page
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>,
);