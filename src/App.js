import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const AudienceStrip = lazy(() => import('./components/AudienceStrip'));
const FeatureTriad = lazy(() => import('./components/FeatureTriad'));
const AnalyticsDemo = lazy(() => import('./components/AnalyticsDemo'));
const WhyLunqo = lazy(() => import('./components/WhyLunqo'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTABanner = lazy(() => import('./components/CTABanner'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen gpu-accelerated">
        <Suspense fallback={<LoadingFallback />}>
        <Navbar />
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
    </LanguageProvider>
  );
}

export default App; 