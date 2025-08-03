import React, { Suspense, lazy, useMemo } from 'react';
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

// Simple loading fallback component - memoized to prevent unnecessary re-renders
const LoadingFallback = React.memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
));

// Main App Content Component - memoized to prevent unnecessary re-renders
const AppContent = React.memo(() => {
  // Memoize fallback components to prevent unnecessary re-renders
  const sectionFallback = useMemo(() => <div className="h-32 bg-dark-800/8" />, []);
  const footerFallback = useMemo(() => <div className="h-32 bg-dark-900" />, []);

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
        
        <Suspense fallback={sectionFallback}>
          <AudienceStrip />
        </Suspense>
        
        <Suspense fallback={sectionFallback}>
          <FeatureTriad />
        </Suspense>
        
        <Suspense fallback={sectionFallback}>
          <AnalyticsDemo />
        </Suspense>
        
        <Suspense fallback={sectionFallback}>
          <WhyLunqo />
        </Suspense>
        
        <Suspense fallback={sectionFallback}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={sectionFallback}>
          <CTABanner />
        </Suspense>
      </main>
      
      <Suspense fallback={footerFallback}>
        <Footer />
      </Suspense>
    </div>
  );
});

// Memoize routes to prevent unnecessary re-renders
const AppRoutes = React.memo(() => (
  <Routes>
    <Route path="/en" element={<AppContent />} />
    <Route path="/ru" element={<AppContent />} />
    <Route path="/" element={<Navigate to="/en" replace />} />
  </Routes>
));

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </Router>
  );
}

export default App; 