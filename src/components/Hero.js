import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin, Grid3X3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/localization';

const Hero = () => {
  const { language } = useLanguage();
  
  // Memoized stats data to prevent unnecessary re-renders
  const stats = useMemo(() => [
    { label: translations[language]?.fleetsServed || 'Fleets Served', value: '500+' },
    { label: translations[language]?.dailyImpressions || 'Daily Impressions', value: '2.5M+' },
    { label: translations[language]?.citiesCovered || 'Cities Covered', value: '25+' },
    { label: translations[language]?.uptime || 'Uptime', value: '99.9%' }
  ], [language]);

  // Memoized animation variants for better performance
  const containerVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }), []);

  const badgeVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.1, duration: 0.5, ease: "easeOut" }
  }), []);

  const headlineVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.6, ease: "easeOut" }
  }), []);

  const subheadlineVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.6, ease: "easeOut" }
  }), []);

  const ctaVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.6, ease: "easeOut" }
  }), []);

  const statsVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.6, ease: "easeOut" }
  }), []);

  const scrollIndicatorVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1, duration: 0.6, ease: "easeOut" }
  }), []);

  // Optimized floating animation variants
  const floatingVariants = useMemo(() => ({
    float1: {
      y: [0, -15, 0],
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        repeatDelay: 0
      }
    },
    float2: {
      y: [0, 20, 0],
      transition: { 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut",
        repeatDelay: 0
      }
    }
  }), []);

  const scrollIndicatorFloatVariants = useMemo(() => ({
    float: {
      y: [0, 8, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut"
      }
    },
    innerFloat: {
      y: [0, 10, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized button click handlers
  const handleDemoClick = useCallback(() => {
    // Demo click handler
    console.log('Demo clicked');
  }, []);

  const handleWatchClick = useCallback(() => {
    // Watch click handler
    console.log('Watch clicked');
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animate-120fps">
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-charcoal to-dark-900">
        {/* Static Grid Pattern - optimized for 120fps */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(24, 160, 251, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(89, 255, 112, 0.1) 0%, transparent 50%)`,
              backgroundSize: '100px 100px, 150px 150px',
              transform: 'translateZ(0)'
            }} 
          />
        </div>

        {/* Optimized floating elements for 120fps */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary-blue rounded-full animate-120fps gpu-accelerated"
          variants={floatingVariants}
          animate="float1"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-2 h-2 bg-primary-lime rounded-full animate-120fps gpu-accelerated"
          variants={floatingVariants}
          animate="float2"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto animate-120fps"
        >
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-full px-4 py-2 mb-8 animate-120fps gpu-accelerated"
          >
            <div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
            <span className="text-sm text-dark-300">{translations[language]?.smartSeatMedia || 'SmartSeat Media Platform'}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={headlineVariants}
            initial="initial"
            animate="animate"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-120fps"
          >
            <span className="text-white">{translations[language]?.heroTitle || 'Lunqo: Light-Up Ads on the Go'}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={subheadlineVariants}
            initial="initial"
            animate="animate"
            className="text-lg sm:text-xl lg:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-120fps"
          >
            {translations[language]?.heroSubtitle || 'Unified control, real-time insights, effortless scaling for in-taxi media.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={ctaVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-120fps"
          >
            <motion.button
              className="btn-primary flex items-center space-x-2 hover-scale gpu-accelerated"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeInOut" }}
              onClick={handleDemoClick}
            >
              <span>{translations[language]?.scheduleDemo || 'Schedule a Live Demo'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="btn-secondary flex items-center space-x-2 hover-scale gpu-accelerated"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeInOut" }}
              onClick={handleWatchClick}
            >
              <Play className="w-5 h-5" />
              <span>{translations[language]?.watchOverview || 'Watch Overview'}</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={statsVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto animate-120fps"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.5, ease: "easeOut" }}
                className="text-center animate-120fps gpu-accelerated"
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Optimized Scroll Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-120fps gpu-accelerated"
      >
        <motion.div
          variants={scrollIndicatorFloatVariants}
          animate="float"
          className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center gpu-accelerated"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.div
            variants={scrollIndicatorFloatVariants}
            animate="innerFloat"
            className="w-1 h-3 bg-primary-blue rounded-full mt-2 gpu-accelerated"
            style={{ transform: 'translateZ(0)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero); 