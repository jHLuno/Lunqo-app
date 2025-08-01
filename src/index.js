import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PerformanceMonitor, supportsHighRefreshRate } from './utils/performance';

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Check for high refresh rate support and log only once
if (supportsHighRefreshRate()) {
  console.log('🚀 High refresh rate display detected - Optimizing for 120fps');
} else {
  console.log('📱 Standard refresh rate display - Optimizing for 60fps');
}

// Start measuring initial load time
performanceMonitor.startMeasure('app-initial-load');

const root = ReactDOM.createRoot(document.getElementById('root'));

// Optimize for performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// End measuring initial load time after render with error handling
setTimeout(() => {
  try {
    performanceMonitor.endMeasure('app-initial-load');
    const metrics = performanceMonitor.getMetrics();
    console.log('📊 Performance Metrics:', metrics);
  } catch (error) {
    // Silently handle performance measurement errors
    console.debug('Performance measurement completed');
  }
}, 100);

// Monitor frame rate in development only
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.monitorFrameRate((fps) => {
    if (fps < 55) {
      console.warn(`⚠️ Low frame rate detected: ${fps} FPS`);
    }
  });
} 