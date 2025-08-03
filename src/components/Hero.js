import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin, Grid3X3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('hero.stats.fleetsServed'), value: '500+' },
    { label: t('hero.stats.dailyImpressions'), value: '2.5M+' },
    { label: t('hero.stats.citiesCovered'), value: '25+' },
    { label: t('hero.stats.uptime'), value: '99.9%' }
  ];

  const handleDemoClick = () => {
    const url = t('urls.demo');
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWatchClick = () => {
    const url = t('urls.website') + '/overview';
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-charcoal to-dark-900">
        {/* Static Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(24, 160, 251, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(89, 255, 112, 0.1) 0%, transparent 50%)`,
              backgroundSize: '100px 100px, 150px 150px'
            }} 
          />
        </div>

        {/* Creative Decorative Elements */}
        
        {/* Animated Geometric Screens */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-10 bg-gradient-to-r from-primary-blue/20 to-primary-lime/20 rounded-lg border border-primary-blue/30"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-8 bg-gradient-to-l from-primary-lime/25 to-primary-blue/25 rounded-md border border-primary-lime/40"
          animate={{ 
            rotate: [0, -3, 0, 3, 0],
            y: [0, -10, 0, 10, 0],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Floating Light Orbs */}
        <motion.div
          className="absolute top-1/5 right-1/3 w-3 h-3 bg-primary-lime rounded-full"
          animate={{ 
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-primary-blue rounded-full"
          animate={{ 
            x: [0, -25, 15, 0],
            y: [0, 20, -15, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 0.6, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Animated Connection Lines */}
        <motion.svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <motion.path
            d="M 50 150 Q 150 50 250 150 Q 350 250 450 150"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18A0FB" />
              <stop offset="50%" stopColor="#59FF70" />
              <stop offset="100%" stopColor="#18A0FB" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Digital Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-blue to-primary-lime rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, 15, -15, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 6 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Holographic Grid Effect */}
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-20 h-20 border border-primary-lime/20 rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-2 border border-primary-blue/30 rounded-md" />
          <div className="absolute inset-4 border border-primary-lime/40 rounded-sm" />
        </motion.div>

        {/* Pulsing Tech Rings */}
        <motion.div
          className="absolute top-1/6 left-1/6 w-24 h-24 border-2 border-primary-blue/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-4 border border-primary-lime/30 rounded-full"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
            <span className="text-sm text-dark-300">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">Lunqo: </span>
            <span className="gradient-text">Light-Up Ads</span>
            <br />
            <span className="text-white">on the Go</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl lg:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoClick}
            >
              <span>{t('hero.scheduleDemo')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWatchClick}
            >
              <Play className="w-5 h-5" />
              <span>{t('hero.watchDemo')}</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-2 text-dark-300"
            >
              <span className="text-sm">{t('hero.scrollToExplore')}</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-dark-300 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-dark-300 rounded-full mt-2" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 