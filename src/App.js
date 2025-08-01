import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AudienceStrip from './components/AudienceStrip';
import FeatureTriad from './components/FeatureTriad';
import AnalyticsDemo from './components/AnalyticsDemo';
import WhyLunqo from './components/WhyLunqo';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AudienceStrip />
        <FeatureTriad />
        <AnalyticsDemo />
        <WhyLunqo />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App; 