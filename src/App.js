import React, { Suspense, lazy, useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// Import the EarlyAccessPopup component
import EarlyAccessPopup from './components/EarlyAccessPopup';

// Create Popup Context
const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

// Lazy load only heavy components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const ScrollNavbar = lazy(() => import('./components/ScrollNavbar'));
const Hero = lazy(() => import('./components/Hero'));
const AnalyticsDemo = lazy(() => import('./components/AnalyticsDemo'));
const WhyLunqo = lazy(() => import('./components/WhyLunqo'));
const Testimonials = lazy(() => import('./components/Testimonials'));

// Import simple components directly (no lazy loading needed)
import AudienceStrip from './components/AudienceStrip';
import FeatureTriad from './components/FeatureTriad';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

// Simple loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

// Main App Content Component
const AppContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Auto-open popup after a delay (optional)
  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('lunqo_early_access_seen');
    
    if (!hasSeenPopup) {
      // Open popup after 3 seconds
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem('lunqo_early_access_seen', 'true');
  };

  const popupValue = {
    isOpen: isPopupOpen,
    openPopup,
    closePopup
  };

  return (
    <PopupContext.Provider value={popupValue}>
      <div className="min-h-screen">
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
        </Suspense>
        
        <Suspense fallback={<div />}>
          <ScrollNavbar />
        </Suspense>
        
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
          </Suspense>
          
            <AudienceStrip />
          
            <FeatureTriad />
          
          <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
            <AnalyticsDemo />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
            <WhyLunqo />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
            <Testimonials />
          </Suspense>
          
            <CTABanner />
        </main>
        
          <Footer />

        {/* Early Access Popup */}
        <EarlyAccessPopup 
          isOpen={isPopupOpen} 
          onClose={closePopup}
        />
      </div>
    </PopupContext.Provider>
  );
};

function App() {
  useEffect(() => {
    // Performance monitoring
    if (process.env.NODE_ENV === 'production') {
      // Basic performance monitoring without external dependencies
      if (typeof window !== 'undefined' && 'performance' in window) {
        // Monitor page load time
        window.addEventListener('load', () => {
          if (performance.timing && performance.timing.loadEventEnd && performance.timing.navigationStart) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (process.env.NODE_ENV !== 'production') {
  console.log('Page load time:', loadTime + 'ms');
}
          }
        });
      }
    }
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/en" element={<AppContent />} />
          <Route path="/ru" element={<AppContent />} />
          <Route path="/" element={<Navigate to="/en" replace />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App; 