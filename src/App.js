import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const ScrollNavbar = lazy(() => import('./components/ScrollNavbar'));
const Hero = lazy(() => import('./components/Hero'));
const AudienceStrip = lazy(() => import('./components/AudienceStrip'));
const FeatureTriad = lazy(() => import('./components/FeatureTriad'));
const AnalyticsDemo = lazy(() => import('./components/AnalyticsDemo'));
const WhyLunqo = lazy(() => import('./components/WhyLunqo'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTABanner = lazy(() => import('./components/CTABanner'));
const Footer = lazy(() => import('./components/Footer'));

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
  return (
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
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <AudienceStrip />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <FeatureTriad />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <AnalyticsDemo />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <WhyLunqo />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-dark-800/8" />}>
          <CTABanner />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-32 bg-dark-900" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Performance monitoring
    if (process.env.NODE_ENV === 'production') {
      // Report Core Web Vitals
      if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
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