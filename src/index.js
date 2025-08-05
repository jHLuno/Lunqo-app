import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Simple performance logging without complex monitoring
if (process.env.NODE_ENV === 'development') {
  if (process.env.NODE_ENV !== 'production') {
  console.log('🚀 Lunqo App - Development Mode');
}
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Optimize for performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 